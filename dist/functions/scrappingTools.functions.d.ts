import { Model } from 'mongoose';
import { ArtistDocument } from '../db/artist.schema';
import { PageUrlDto } from '../dto/createUrl.dto';
import { HttpService } from '@nestjs/axios';
export default class ScrappingTools {
    private artistModel;
    private readonly httpService;
    constructor(artistModel: Model<ArtistDocument>, httpService: HttpService);
    findArtist(artistName: string): Promise<any>;
    getAllArtists(): Promise<any>;
    getPageContent(pageUrl: PageUrlDto): Promise<any>;
    verifyNewContent(pageUrl: PageUrlDto): Promise<any>;
    cronJobFunction(): Promise<any>;
}
