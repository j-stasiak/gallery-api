import { LocalAuthGuard } from './local.auth-guard';
import { Controller, Post, UseGuards, Request, Body, ValidationPipe, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body(new ValidationPipe({ transform: true })) credentials: RegisterDto) {
    credentials.password = await bcrypt.hash(credentials.password, 20);
    this.authService.registerUser(credentials);
  }

  @Post('verify')
  async verifyUser(@Query('hex') hex: string) {
    const user = this.authService.verifyUser(hex);
  }
}
