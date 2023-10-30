"use strict";
// rename this file accordigly
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpsertDTO = void 0;
// import { EndpointType } from '@prisma/client';
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
// example regex needed for dto
const passwordRegEx = /^[a-zA-Z][a-zA-Z0-9\s.\-_#$]*$/;
const stringRegEx = /^[a-zA-Z][a-zA-Z0-9\s.\-_]*$/;
// example DTO modify as needed
class UpsertDTO {
}
exports.UpsertDTO = UpsertDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpsertDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4, { message: "label must be at least 4 chracters long" }),
    (0, class_validator_1.MaxLength)(32, { message: "label can not be longer than 32 characters" }),
    (0, class_validator_1.Matches)(stringRegEx, {
        message: "label can contain only aplha numeric characters and .-_ ",
    }),
    __metadata("design:type", String)
], UpsertDTO.prototype, "label", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpsertDTO.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(7, { message: "ipAddress must be at least 7 chracters long" }),
    (0, class_validator_1.MaxLength)(39, { message: "ipAddress can not be longer than 39 characters" }),
    (0, class_validator_1.ValidateIf)((o) => (0, class_validator_1.isIP)(o.ipAddress, 4) || (0, class_validator_1.isIP)(o.ipAddress, 6)),
    __metadata("design:type", String)
], UpsertDTO.prototype, "ipAddress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPort)(),
    __metadata("design:type", Number)
], UpsertDTO.prototype, "port", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpsertDTO.prototype, "webRTC", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        return new Date(value);
    }),
    (0, class_validator_1.IsDate)({ message: "lastRegistered must be a valid date" }),
    (0, class_validator_1.MaxDate)(new Date(Date.now() - 1000), {
        message: "lastRegistered cannot be in the future",
    }),
    __metadata("design:type", Date)
], UpsertDTO.prototype, "lastRegistered", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        return new Date(value);
    }),
    (0, class_validator_1.IsDate)({ message: "lastRegistered must be a valid date" }),
    (0, class_validator_1.MinDate)(new Date(Date.now() + 3600000), {
        message: "registrationExpiry has to be at least 1 hour in the future",
    }),
    __metadata("design:type", Date)
], UpsertDTO.prototype, "registrationExpiry", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4, { message: "username must be at least 4 chracters long" }),
    (0, class_validator_1.MaxLength)(39, { message: "username can not be longer than 39 characters" }),
    (0, class_validator_1.Matches)(stringRegEx, {
        message: "username can contain only aplha numeric characters and .-_ ",
    }),
    __metadata("design:type", String)
], UpsertDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: "password must be at least 8 chracters long" }),
    (0, class_validator_1.MaxLength)(32, { message: "password can not be longer than 32 characters" }),
    (0, class_validator_1.Matches)(passwordRegEx, {
        message: "password can contain only aplha numeric characters and .-_#$ ",
    }),
    __metadata("design:type", String)
], UpsertDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)()
    // @IsEnum(EndpointType)
    // endpointType?: EndpointType;
    ,
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpsertDTO.prototype, "supportedAudioCodecs", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpsertDTO.prototype, "supportedVideoCodecs", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMACAddress)(),
    __metadata("design:type", String)
], UpsertDTO.prototype, "macAddress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertDTO.prototype, "firmwareVersion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertDTO.prototype, "model", void 0);
