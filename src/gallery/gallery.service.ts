import { Gallery, GalleryDocument } from './schemas/gallery.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: string, updateGalleryDto: UpdateGalleryDto) {
    const document = await this.galleryModel.findByIdAndUpdate(id, updateGalleryDto, { useFindAndModify: false, new: true });
    return document;
  }

  async remove(id: string) {
    await this.galleryModel.remove(await this.getById(id));
  }

  async getById(id: string): Promise<GalleryDocument> {
    const document = await this.galleryModel.findById(id);

    if (!document) {
      throw new NotFoundException('GalleryNotFound');
    }

    return document;
  }
}
