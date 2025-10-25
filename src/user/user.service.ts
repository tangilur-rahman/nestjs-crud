import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { LoginUserDTO } from 'src/dto/login-user.dto';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // create user
  async createUser(registerUserDto: RegisterUserDTO) {
    try {
      const user = await this.prisma.user.create({
        data: {
          first_name: registerUserDto.fName,
          last_name: registerUserDto.lName,
          email: registerUserDto.email,
          password: registerUserDto.password,
        },
      });

      // generate jwt token for the user
      const payload = { sub: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload);

      return { user, token };
    } catch (error: unknown) {
      console.log(error);

      return { error: 'Error creating user' };
    }
  }

  // validate user credentials
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
      const payload = { sub: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload);

      return { user, token };
    } catch (error: unknown) {
      console.log(error);

      return { error: 'Error creating user' };
    }
  }
}
