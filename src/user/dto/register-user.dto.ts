import { Role } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class RegisterUserDTO {
  @IsNotEmpty()
  @IsString({ message: 'First name must be a string' })
  fName: string;

  @IsNotEmpty()
  @IsString({ message: 'Last name must be a string' })
  lName: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsStrongPassword()
  password: string;

  role: Role;
}
