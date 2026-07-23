import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService, LoginRequest } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() request: LoginRequest) {
    return this.authService.login(request);
  }

  @Get('me')
  profile() {
    return this.authService.profile();
  }
}
