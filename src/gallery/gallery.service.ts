import { Gallery, GalleryDocument } from './schemas/gallery.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name)
    private readonly galleryModel: Model<GalleryDocument>,) { }

  create(createGalleryDto: CreateGalleryDto) {
    return 'This action adds a new gallery';
  }

  findAll() {
    return `This action returns all gallery`;
  }

  findOne(id: string) {
    return `This action returns a #${id} gallery`;
  }

  update(id: string, updateGalleryDto: UpdateGalleryDto) {
    return `This action updates a #${id} gallery`;
  }

  remove(id: string) {
    return `This action removes a #${id} gallery`;
  }
}
