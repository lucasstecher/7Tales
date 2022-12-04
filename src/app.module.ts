import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { ArtistSchema } from './db/artist.schema';
import ScrappingTools from './functions/scrappingTools.functions';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(config.mongoURI),
    MongooseModule.forFeature([{ name: 'Artist', schema: ArtistSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, ScrappingTools],
})
export class AppModule {}
