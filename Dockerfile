FROM node:18.20.3-bookworm-slim

WORKDIR /usr/src/xxxxx # Add service name

COPY package*.json ./
COPY .env.example ./

RUN apt-get update -y && apt-get install -y openssl apt-utils curl unzip jq

# Install Bitwarden Secrets CLI (bws) based on architecture
RUN arch=$(dpkg --print-architecture); \
    case "$arch" in \
        "amd64") ARCH="x86_64" ;; \
        "arm64") ARCH="aarch64" ;; \
        *) echo "Unsupported architecture: $arch" && exit 1 ;; \
    esac && \
    curl -sL https://github.com/bitwarden/sdk/releases/download/bws-v0.5.0/bws-$ARCH-unknown-linux-gnu-0.5.0.zip -o bws.zip && \
    unzip bws.zip && \
    mv bws /usr/local/bin/ && \
    chmod +x /usr/local/bin/bws && \
    rm bws.zip

RUN sed -i 's/=.*/=/' .env.example

COPY . .

# Copy entrypoint script and ensure it has execute permissions
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["npm", "run", "start"]

EXPOSE 3003
