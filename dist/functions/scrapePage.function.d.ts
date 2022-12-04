import { HttpService } from '@nestjs/axios';
import { PageUrlDto } from '../dto/createUrl.dto';
export default class PageScrapper {
    private readonly httpService;
    constructor(httpService: HttpService);
    getPageContent(pageUrl: PageUrlDto): Promise<any>;
}
