import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthHelperService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: User) {
    const payload = { role: user.role, email: user.email };
    return await this.jwtService.signAsync(payload);
  }
}
