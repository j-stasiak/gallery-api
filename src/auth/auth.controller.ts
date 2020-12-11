import { LocalAuthGuard } from './local.auth-guard';
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  ValidationPipe,
  Query,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() credentials: { email: string, password: string }) {
    const user = await this.authService.authenticate(credentials.email, credentials.password);

    if (!user) {
      throw new NotFoundException('UserNotFound', 'User with given credentials was not found!');
    }

    return await this.authService.login(user);
  }

  @Post('register')
  async register(
    @Body(new ValidationPipe({ transform: true })) credentials: RegisterDto,
  ) {
    credentials.password = await bcrypt.hash(credentials.password, 20);
    await this.authService.registerUser(credentials);
  }

  @Post('verify')
  async verifyUser(@Query('hex') hex: string) {
    this.authService.verifyUser(hex);
  }
}
