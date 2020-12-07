import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  verified: boolean;

  @Prop()
  verificationHex: string;

  @Prop({ type: Object })
  additionalInfo?: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    birthDate?: string;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);