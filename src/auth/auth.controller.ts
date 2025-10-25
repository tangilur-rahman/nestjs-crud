import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from 'src/dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDTO: RegisterUserDTO) {
    return this.authService.registerUser(registerUserDTO);
  }
}
