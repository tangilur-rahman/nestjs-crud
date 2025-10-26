import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthHelperService } from 'src/shared/auth-helper.service';
import { LoginUserDTO } from 'src/user/dto/login-user.dto';
import { RegisterUserDTO } from 'src/user/dto/register-user.dto';
import { omit } from 'src/utils/omit';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authHelperService: AuthHelperService,
  ) {}

  // 1️⃣ create user
  async createUser(registerUserDto: RegisterUserDTO) {
    try {
      const user = await this.prisma.user.create({
        data: {
          first_name: registerUserDto.fName,
          last_name: registerUserDto.lName,
          email: registerUserDto.email,
          password: registerUserDto.password,
          role: registerUserDto.role,
        },
      });

      // generate jwt token for the user
      const token = await this.authHelperService.generateToken(user);

      return { user: omit(user, 'password'), token };
    } catch (error: unknown) {
      console.log(error);

      return { error: 'Error creating user' };
    }
  }

  // 2️⃣ validate user credentials
  async validateUserCredentials({ email, password }: LoginUserDTO) {
    try {
      // fetching user
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      // check user
      if (!user) {
        return { error: 'User not found' };
      }

      // check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return { error: 'Invalid password' };
      }

      // generate jwt token for the user
      const token = await this.authHelperService.generateToken(user);

      return { user: omit(user, 'password'), token };
    } catch (error: unknown) {
      console.log(error);

      return { error: 'Error creating user' };
    }
  }

  // 3️⃣ find user profile
  async findUser(where: {
    email: string;
  }): Promise<Omit<User, 'password'> | { error: string } | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: where.email },
      });

      if (!user) {
        return null;
      }

      return omit(user, 'password');
    } catch (error: unknown) {
      console.log(error);
      return { error: 'Error finding user' };
    }
  }
}
