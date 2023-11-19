import { IsArray, IsInt, IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(10)
  @Max(99999)
  price: number

  @IsString()
  @Length(10, 200)
  description: string

  @IsArray({ message: 'images must be array of strings' })
  images: string[] | string
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @Min(10)
  @Max(99999)
  @IsOptional()
  price: number

  @IsString()
  @Length(10, 200)
  @IsOptional()
  description: string

  @IsArray({ message: 'images must be array of strings' })
  @IsOptional()
  images: string[] | string
}