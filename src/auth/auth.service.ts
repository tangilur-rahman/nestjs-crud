import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { LoginUserDTO } from 'src/user/dto/login-user.dto';
import { RegisterUserDTO } from 'src/user/dto/register-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // 1️⃣ register user
  async registerUser(registerUserDto: RegisterUserDTO) {
    // hashing password before creating user
    const hash = await bcrypt.hash(registerUserDto.password, 10);

    // create user
    return await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });
  }

  // 2️⃣ login user
  async loginUser(loginUserDto: LoginUserDTO) {
    return await this.userService.validateUserCredentials({
      ...loginUserDto,
    });
  }

  // 3️⃣ get user profile
  async getUserProfile(where: {
    email: string;
  }): Promise<{ error: string } | null | Omit<User, 'password'>> {
    return await this.userService.findUser(where);
  }
}
