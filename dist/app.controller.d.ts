import { AppService } from './app.service';
import { PageUrlDto } from './dto/createUrl.dto';
import { ArtistNameDto } from './dto/artistName.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getNewContent(): Promise<any>;
    saveArtist(pageUrl: PageUrlDto): Promise<any>;
    updateArtistImageList(artistName: ArtistNameDto): Promise<any>;
    removeArtist(artistName: ArtistNameDto): Promise<any>;
}
