import { Injectable } from '@nestjs/common';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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

      return user;
    } catch (error: unknown) {
      console.log(error);

      return { error: 'Error creating user' };
    }
  }
}
