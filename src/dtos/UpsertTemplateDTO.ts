import { TemplateType, PrismaClient } from '@prisma/client';
import { 
  IsEnum,
  IsOptional, 
  IsString, 
  IsUUID, 
  Matches, 
  MaxLength, 
  MinLength
} from 'class-validator';
import { IsValidDatabaseId } from '@ipcortex/commons';

const prisma = new PrismaClient();

export const santisationRegEx = /^[a-zA-Z][a-zA-Z0-9\s.\-_]*$/;

export class UpsertTemplateDTO {
  @IsOptional()
  @IsUUID()
    id?: string;

  @IsUUID()
  @IsValidDatabaseId(prisma, 'Template')
    parentId!: string;

  @IsString()
  @MinLength(4,{message: 'name must be at least 4 characters long'})
  @MaxLength(32,{message: 'name can not be longer than 32 characters'})
  @Matches(santisationRegEx, {message: 'name can contain only alpha numeric characters, spaces and .-_ '})
    name!: string;

  @IsEnum(TemplateType)
    type!: TemplateType;

}
