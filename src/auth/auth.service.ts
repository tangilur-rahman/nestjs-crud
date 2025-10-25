import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { LoginUserDTO } from 'src/dto/login-user.dto';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
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
}
