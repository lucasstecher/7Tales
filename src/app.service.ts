import { Injectable } from '@nestjs/common';
import { PageUrlDto } from './dto/createUrl.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ArtistDocument } from './db/artist.schema';
import ScrappingTools from './functions/scrappingTools.functions';
import { ArtistNameDto } from './dto/artistName.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly scrappingTools: ScrappingTools,
    @InjectModel('Artist')
    private artistModel: Model<ArtistDocument>,
  ) {}

  async saveArtist(pageUrl: PageUrlDto): Promise<any> {
    let createdArtist;
    try {
      const pageContent = await this.scrappingTools.getPageContent(pageUrl);
      createdArtist = new this.artistModel(pageContent).save();
    } catch (e) {
      throw new Error(e);
    }
    return !!createdArtist;
  }

  async getNewContents(): Promise<any> {
    let newContents;
    try {
      newContents = await this.artistModel.find({ visitAgain: true });
    } catch (e) {
      throw new Error(e);
    }
    return newContents;
  }

  async updateImageList(artistName: ArtistNameDto): Promise<any> {
    let dbUpdateImageListResult;
    const artistDbContent = await this.scrappingTools.findArtist(
      artistName.name,
    );
    const artistScrappedContent = await this.scrappingTools.getPageContent({
      url: artistDbContent.url,
    });
    try {
      dbUpdateImageListResult = await this.artistModel.updateOne(
        { name: artistName },
        {
          $set: {
            visitAgain: false,
            imageList: artistScrappedContent.imageList,
          },
        },
      );
    } catch (e) {
      throw new Error(e);
    }
    return dbUpdateImageListResult;
  }

  async deleteArtist(artistName: ArtistNameDto): Promise<any> {
    let dbDeleteArtist;
    try {
      dbDeleteArtist = await this.artistModel.deleteOne({
        name: artistName.name,
      });
    } catch (e) {
      throw new Error(e);
    }
    return dbDeleteArtist;
  }
}
