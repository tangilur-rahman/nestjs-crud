import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthHelperService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: { role: string; email: string }) {
    return await this.jwtService.signAsync(payload);
  }
}
