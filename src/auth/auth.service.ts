import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDTO) {
    // hashing password before creating user
    const hash = await bcrypt.hash(registerUserDto.password, 10);

    // create user
    const createdUser = (await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    })) as unknown as { id: number; email: string };

    // generate jwt token for the user
    const payload = { sub: createdUser.id, email: createdUser.email };
    const token = await this.jwtService.signAsync(payload);

    return { createdUser, token };
  }
}
