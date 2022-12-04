import { Controller, Body, Get, Post, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { PageUrlDto } from './dto/createUrl.dto';
import { ArtistNameDto } from './dto/artistName.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/contents')
  async getNewContent(): Promise<any> {
    return this.appService.getNewContents();
  }

  @Post('/save')
  async saveArtist(@Body() pageUrl: PageUrlDto): Promise<any> {
    return this.appService.saveArtist(pageUrl);
  }

  @Post('/update')
  async updateArtistImageList(@Body() artistName: ArtistNameDto): Promise<any> {
    return this.appService.updateImageList(artistName);
  }

  @Delete('/delete')
  async removeArtist(@Body() artistName: ArtistNameDto): Promise<any> {
    return this.appService.deleteArtist(artistName);
  }
}
