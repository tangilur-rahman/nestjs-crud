import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(registerUserDto: RegisterUserDTO) {
    // hashing password before creating user
    const hash = await bcrypt.hash(registerUserDto.password, 10);

    return await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });
  }
}
