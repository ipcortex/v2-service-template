#!/bin/bash
set -e
echo "Starting entrypoint script"
echo "Current user: $(whoami)"
echo "Current directory: $(pwd)"
echo "//registry.npmjs.org/:_authToken=${TOKEN}" > .npmrc

# Function to fetch secrets
fetch_secrets() {
    local INPUT_FILE=".env.example"
    local OUTPUT_FILE=".env"
    if [ ! -f "$INPUT_FILE" ]; then
        echo "Error: $INPUT_FILE does not exist"
        exit 1
    fi
    local BWS_OUTPUT=$(mktemp)
    local PROJECT_INFO=$(mktemp)
    if ! bws project get "$PROJECT_ID" --access-token "$BWS_ACCESS_TOKEN" > "$PROJECT_INFO"; then
        echo "Error: Failed to fetch project information"
        rm "$PROJECT_INFO"
        exit 1
    fi
    local PROJECT_NAME=$(jq -r .name "$PROJECT_INFO")
    echo "Processing secrets for project: $PROJECT_NAME"
    if ! bws secret list --access-token "$BWS_ACCESS_TOKEN" | jq --arg PROJECT_ID "$PROJECT_ID" '[.[] | select(.projectId == $PROJECT_ID)]' > "$BWS_OUTPUT"; then
        echo "Error: Failed to fetch secrets"
        rm "$BWS_OUTPUT" "$PROJECT_INFO"
        exit 1
    fi
    while IFS= read -r line; do
        if [[ $line == *"="* ]]; then
            key=$(echo "$line" | cut -d'=' -f1)
            value=$(jq -r ".[] | select(.key == \"$key\") | .value" "$BWS_OUTPUT")
            if [ ! -z "$value" ]; then
                if [[ $value =~ ^[0-9]+$ ]]; then
                    echo "$key=$value" >> "$OUTPUT_FILE"
                else
                    echo "$key='$value'" >> "$OUTPUT_FILE"
                fi
            else
                original_value=$(echo "$line" | cut -d'=' -f2-)
                # Remove leading and trailing whitespace
                original_value="${original_value#"${original_value%%[![:space:]]*}"}"
                original_value="${original_value%"${original_value##*[![:space:]]}"}"
                # Check if the value is already quoted
                if [[ $original_value =~ ^\'.*\'$ || $original_value =~ ^\".*\"$ ]]; then
                    echo "$key=$original_value" >> "$OUTPUT_FILE"
                elif [[ $original_value =~ ^[0-9]+$ ]]; then
                    echo "$key=$original_value" >> "$OUTPUT_FILE"
                else
                    echo "$key='$original_value'" >> "$OUTPUT_FILE"
                fi
            fi
        else
            echo "$line" >> "$OUTPUT_FILE"
        fi
    done < "$INPUT_FILE"
    rm "$BWS_OUTPUT" "$PROJECT_INFO"
}

echo "Fetching secrets"
fetch_secrets

echo "Running npm install"
npm install

echo "Running database migrations"
npx prisma migrate deploy
npx prisma db seed

echo "Starting application"
exec "$@"
