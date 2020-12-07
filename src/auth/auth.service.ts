import { RegisterDto } from './dto/register.dto';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,) { }

  async authenticate(email: string, password: string): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findOne(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return undefined;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  registerUser(credentials: RegisterDto) {
    this.userService.create(credentials);
  }

  verifyUser(hex: string) {
    this.userService.updateVerificationStatus(hex);
  }
}