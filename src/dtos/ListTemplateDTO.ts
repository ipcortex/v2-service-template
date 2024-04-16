import { TemplateType } from '@prisma/client';
import {
  IsEnum,
  IsOptional,
  ValidateNested,
  IsDate,
  IsString,
  MinLength,
  Matches,
  MaxLength
} from 'class-validator';
import { PaginatedRequestDTO } from '@ipcortex/commons';
import { santisationRegEx  } from './UpsertTemplateDTO';
import { Expose, Transform, Type } from 'class-transformer';

export class TemplatesSearchParams {
  @IsOptional()
  @IsString()
  @MinLength(4,{message: 'name must be at least 4 characters long'})
  @MaxLength(32,{message: 'name can not be longer than 32 characters'})
  @Matches(santisationRegEx, {message: 'name can contain only alpha numeric characters, spaces and .-_ '})
    name?: string;

  @IsOptional()
  @IsEnum(TemplateType)
    type!: TemplateType;

  @IsOptional()
  @Transform(({ value }) => {
    return value !== undefined ? new Date(value) : value;
  })
  @IsDate({ message: 'createdAt must be a valid date' })
  @Expose()
    createdAt?: Date;

  @IsOptional()
  @Transform(({ value }) => {
    return value !== undefined ? new Date(value) : value;
  })
  @IsDate({ message: 'updatedAt must be a valid date' })
  @Expose()
    updatedAt?: Date;

}

enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc'
}

export class TemplatesSort { 
  @IsOptional()
  @IsEnum(SortOrder)
  @Expose()
    name?: SortOrder;

  @IsOptional()
  @IsEnum(SortOrder)
  @Expose()
    type?: SortOrder;

  @IsOptional()
  @IsEnum(SortOrder)
  @Expose()
    createdAt?: SortOrder;

  @IsOptional()
  @IsEnum(SortOrder)
  @Expose()
    modifiedAt?: SortOrder;
}


export class ListTemplatesDTO extends PaginatedRequestDTO {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TemplatesSearchParams)
  @Expose()
      params?: TemplatesSearchParams;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TemplatesSort)
  @Expose()
      orderBy?: TemplatesSort;
}