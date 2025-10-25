import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthHelperService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: { sub: number; email: string }) {
    return await this.jwtService.signAsync(payload);
  }
}
