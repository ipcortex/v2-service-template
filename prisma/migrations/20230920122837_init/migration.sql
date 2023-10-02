-- CreateEnum
CREATE TYPE "EndpointType" AS ENUM ('APPLICATION', 'DEVICE');

-- CreateTable
CREATE TABLE "Endpoint" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "user_id" TEXT,
    "ip_address" TEXT DEFAULT '',
    "port" INTEGER DEFAULT 0,
    "web_rtc" BOOLEAN DEFAULT false,
    "last_registered" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "registration_expiry" TIMESTAMPTZ,
    "username" TEXT,
    "password" TEXT,
    "endpoint_type" "EndpointType",
    "supported_audio_codecs" JSONB,
    "supported_video_codecs" JSONB,
    "mac_address" TEXT,
    "firmware_version" TEXT,
    "model" TEXT,

    CONSTRAINT "Endpoint_pkey" PRIMARY KEY ("id")
);
