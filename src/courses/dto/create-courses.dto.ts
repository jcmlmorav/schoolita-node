import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCoursesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;
}
