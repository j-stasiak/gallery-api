import { Gallery, GallerySchema } from './schemas/gallery.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }])],
  controllers: [GalleryController],
  providers: [GalleryService]
})
export class GalleryModule { }
