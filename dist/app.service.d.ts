import { PageUrlDto } from './dto/createUrl.dto';
import { Model } from 'mongoose';
import { ArtistDocument } from './db/artist.schema';
import ScrappingTools from './functions/scrappingTools.functions';
import { ArtistNameDto } from './dto/artistName.dto';
export declare class AppService {
    private readonly scrappingTools;
    private artistModel;
    constructor(scrappingTools: ScrappingTools, artistModel: Model<ArtistDocument>);
    saveArtist(pageUrl: PageUrlDto): Promise<any>;
    getNewContents(): Promise<any>;
    updateImageList(artistName: ArtistNameDto): Promise<any>;
    deleteArtist(artistName: ArtistNameDto): Promise<any>;
}
