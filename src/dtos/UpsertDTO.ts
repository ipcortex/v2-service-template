// rename this file accordigly

// import { EndpointType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDate,
  // IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  IsPort,
  IsBoolean,
  MaxDate,
  IsMACAddress,
  MinDate,
  MinLength,
  MaxLength,
  Matches,
  isIP,
  IsArray,
  ValidateIf,
} from 'class-validator';

// example regex needed for dto
const passwordRegEx = /^[a-zA-Z][a-zA-Z0-9\s.\-_#$]*$/;
const stringRegEx = /^[a-zA-Z][a-zA-Z0-9\s.\-_]*$/;

// example DTO modify as needed
export class UpsertDTO {
  @IsOptional()
  @IsUUID()
  id?: string;

  // min and max are arbitrary
  @IsString()
  @MinLength(4, { message: 'label must be at least 4 chracters long' })
  @MaxLength(32, { message: 'label can not be longer than 32 characters' })
  @Matches(stringRegEx, {
    message: 'label can contain only aplha numeric characters and .-_ ',
  })
  label!: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsString()
  @MinLength(7, { message: 'ipAddress must be at least 7 chracters long' })
  @MaxLength(39, { message: 'ipAddress can not be longer than 39 characters' })
  @ValidateIf((o) => isIP(o.ipAddress, 4) || isIP(o.ipAddress, 6))
  ipAddress?: string;

  @IsOptional()
  @IsPort()
  port?: number;

  @IsOptional()
  @IsBoolean()
  webRTC?: boolean;

  @IsOptional()
  @Transform(({ value }) => {
    return new Date(value);
  })
  @IsDate({ message: 'lastRegistered must be a valid date' })
  @MaxDate(new Date(Date.now() - 1000), {
    message: 'lastRegistered cannot be in the future',
  })
  lastRegistered?: Date;

  @IsOptional()
  @Transform(({ value }) => {
    return new Date(value);
  })
  @IsDate({ message: 'lastRegistered must be a valid date' })
  @MinDate(new Date(Date.now() + 3600000), {
    message: 'registrationExpiry has to be at least 1 hour in the future',
  })
  registrationExpiry?: Date;

  // min length is arbitrary
  // considering username could be an IP the max length is 39 characters (IPv6 max length)
  @IsOptional()
  @IsString()
  @MinLength(4, { message: 'username must be at least 4 chracters long' })
  @MaxLength(39, { message: 'username can not be longer than 39 characters' })
  @Matches(stringRegEx, {
    message: 'username can contain only aplha numeric characters and .-_ ',
  })
  username?: string;

  // min and max are arbitrary
  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'password must be at least 8 chracters long' })
  @MaxLength(32, { message: 'password can not be longer than 32 characters' })
  @Matches(passwordRegEx, {
    message: 'password can contain only aplha numeric characters and .-_#$ ',
  })
  password?: string;

  @IsOptional()
  // @IsEnum(EndpointType)
  // endpointType?: EndpointType;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  supportedAudioCodecs?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  supportedVideoCodecs?: string[];

  @IsOptional()
  @IsString()
  @IsMACAddress()
  macAddress?: string;

  @IsOptional()
  @IsString()
  firmwareVersion?: string;

  @IsOptional()
  @IsString()
  model?: string;
}
