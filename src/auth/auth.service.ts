import { RegisterDto } from './dto/register.dto';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,) { }

  async authenticate(email: string, password: string): Promise<Omit<UserDocument, 'password'>> {
    const user = await this.userService.findOne(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      user.lastLogin = new Date();
      await user.save();
      return user;
    }

    return undefined;
  }

  async login(user: Omit<UserDocument, 'password'>) {
    const payload = { email: user.email, sub: user.id, lastLogin: user.lastLogin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  registerUser(credentials: RegisterDto): Promise<Omit<UserDocument, 'password'>> {
    return this.userService.create(credentials);
  }

  verifyUser(hex: string) {
    this.userService.updateVerificationStatus(hex);
  }
}
