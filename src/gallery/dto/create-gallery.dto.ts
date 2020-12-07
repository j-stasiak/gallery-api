import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

export class CreateGalleryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  tags: string[];

  @ApiProperty()
  @IsBoolean()
  private: boolean;
}
