import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ArtistDocument } from '../db/artist.schema';
import { PageUrlDto } from '../dto/createUrl.dto';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';

@Injectable()
export default class ScrappingTools {
  constructor(
    @InjectModel('Artist')
    private artistModel: Model<ArtistDocument>,
    private readonly httpService: HttpService,
  ) {}

  async findArtist(artistName: string): Promise<any> {
    let artistResult;
    try {
      artistResult = await this.artistModel.findOne({
        name: artistName,
      });
    } catch (e) {
      throw new Error(e);
    }
    return artistResult;
  }

  async getAllArtists(): Promise<any> {
    let artistDbResult;
    try {
      artistDbResult = await this.artistModel.find();
    } catch (e) {
      throw new Error(e);
    }
    return artistDbResult;
  }

  async getPageContent(pageUrl: PageUrlDto): Promise<any> {
    const response = await this.httpService.axiosRef.get(pageUrl.url);
    const html = cheerio.load(response.data);
    const imgArr = [];
    const urlSplit = pageUrl.url.split('/index');
    if (urlSplit[0] === 'https://rule34.xxx') {
      html('.image-list > .thumb').each((index, pageElement: any) => {
        imgArr.push(pageElement.attribs.id);
      });
    } else if (urlSplit[0] === 'https://gelbooru.com') {
      html('.thumbnail-preview > a').each((pageElement: any) => {
        imgArr.push(pageElement.attribs.id);
      });
    } else {
      throw Error(`Invalid URL`);
    }
    return {
      name: html("input[name='tags']").val(),
      url: pageUrl.url,
      imageList: imgArr,
      visitAgain: false,
    };
  }

  async verifyNewContent(pageUrl: PageUrlDto): Promise<any> {
    let dbUpdateResult;
    try {
      const scrappedPageResult = await this.getPageContent(pageUrl);
      const dbFindArtist = await this.artistModel.findOne({
        name: scrappedPageResult.name,
      });
      if (
        JSON.stringify(dbFindArtist.imageList) !==
        JSON.stringify(scrappedPageResult.imageList)
      ) {
        try {
          dbUpdateResult = await this.artistModel.updateOne(
            { name: scrappedPageResult.name },
            {
              $set: {
                visitAgain: true,
              },
            },
          );
        } catch (e) {
          throw new Error(e);
        }
      }
    } catch (e) {
      throw new Error(e);
    }
    return dbUpdateResult;
  }

  async cronJobFunction(): Promise<any> {
    try {
      const artistsList: any = await this.getAllArtists();
      for (let i = 0; i < artistsList.length; i++) {
        await this.verifyNewContent({ url: artistsList[i].url });
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
