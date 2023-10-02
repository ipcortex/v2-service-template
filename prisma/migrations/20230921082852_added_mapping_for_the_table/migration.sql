/*
  Warnings:

  - You are about to drop the `Endpoint` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Endpoint";

-- CreateTable
CREATE TABLE "endpoints" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "user_id" TEXT,
    "ip_address" TEXT DEFAULT '',
    "port" INTEGER DEFAULT 0,
    "web_rtc" BOOLEAN DEFAULT false,
    "last_registered" TIMESTAMPTZ,
    "registration_expiry" TIMESTAMPTZ,
    "username" TEXT,
    "password" TEXT,
    "endpoint_type" "EndpointType",
    "supported_audio_codecs" JSONB,
    "supported_video_codecs" JSONB,
    "mac_address" TEXT,
    "firmware_version" TEXT,
    "model" TEXT,

    CONSTRAINT "endpoints_pkey" PRIMARY KEY ("id")
);
