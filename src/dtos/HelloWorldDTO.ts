import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class HelloWorldDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  name!: string;
}
