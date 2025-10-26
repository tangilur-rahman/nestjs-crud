import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginUserDTO } from 'src/dto/login-user.dto';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 1️⃣ register user
  @Post('register')
  register(@Body() registerUserDTO: RegisterUserDTO) {
    return this.authService.registerUser(registerUserDTO);
  }

  // 2️⃣ login user
  @Post('login')
  login(@Body() loginUserDTO: LoginUserDTO) {
    return this.authService.loginUser(loginUserDTO);
  }

  // 3️⃣ profile user
  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Request() req) {
    const userEmail = req.user.email;
    return this.authService.getUserProfile({ email: userEmail });
  }
}
