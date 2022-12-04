import { Model } from 'mongoose';
import { ArtistDocument } from '../db/artist.schema';
import { PageUrlDto } from '../dto/createUrl.dto';
import PageScrapper from '../functions/scrapePage.function';
export default class VerifyNewContent {
    private readonly pageScrapper;
    private artistModel;
    constructor(pageScrapper: PageScrapper, artistModel: Model<ArtistDocument>);
    verifyNewContent(pageUrl: PageUrlDto): Promise<any>;
}
