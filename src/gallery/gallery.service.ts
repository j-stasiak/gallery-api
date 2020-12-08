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

  async create(createGalleryDto: CreateGalleryDto): Promise<Gallery> {
    const gallery = new this.galleryModel(createGalleryDto);
    return gallery.save();
  }

  findAll() {
    return `This action returns all gallery`;
  }

  findOne(id: string) {
    return this.galleryModel.findById(id);
  }

  update(id: string, updateGalleryDto: UpdateGalleryDto) {
    return `This action updates a #${id} gallery`;
  }

  remove(id: string) {
    return `This action removes a #${id} gallery`;
  }
}
