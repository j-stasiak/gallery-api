import { IsEmail, IsString } from "class-validator";
import { IsPasswordSecure } from "../validators/secure-password.validator";

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsPasswordSecure()
  password: string;
}
