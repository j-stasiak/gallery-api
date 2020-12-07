import { RegisterDto } from './../auth/dto/register.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>) { }

  async create(registerDto: RegisterDto): Promise<UserDocument> {
    const verificationHex = crypto.randomBytes(20).toString('hex');

    const user = await this.userModel.create({
      email: registerDto.email,
      password: registerDto.password,
      verified: false,
      verificationHex: verificationHex,
    });

    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string): Promise<UserDocument> {
    return this.userModel.findOne(user => user.email == email);
  }

  async updateVerificationStatus(hex: string): Promise<void> {
    const user = await this.userModel.findOne(user => user.verificationHex == hex);
    await this.userModel.findOneAndUpdate({ '_id': user.id }, { 'verified': true });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
