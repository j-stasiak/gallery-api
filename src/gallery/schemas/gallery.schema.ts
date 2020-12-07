import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Photo } from "src/photo/entities/photo.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { User } from "src/user/entities/user.entity";

export type GalleryDocument = Gallery & Document;

@Schema({ timestamps: true })
export class Gallery {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  tags: string[];

  @Prop()
  private: boolean;

  @Prop({
    ref: Photo.name,
    type: [mongooseSchema.Types.ObjectId],
  })
  photos: Photo[];

  @Prop({
    ref: Comment.name,
    type: [mongooseSchema.Types.ObjectId],
  })
  comments: Comment[];

  @Prop({
    ref: User.name,
    type: mongooseSchema.Types.ObjectId,
  })
  user: User;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);