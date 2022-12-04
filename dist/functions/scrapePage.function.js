"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("@nestjs/axios");
const cheerio = require("cheerio");
const common_1 = require("@nestjs/common");
let PageScrapper = class PageScrapper {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getPageContent(pageUrl) {
        const response = await this.httpService.axiosRef.get(pageUrl.url);
        const html = cheerio.load(response.data);
        const imgArr = [];
        const urlSplit = pageUrl.url.split('/index');
        if (urlSplit[0] === 'https://rule34.xxx') {
            html('.image-list > .thumb').each((index, pageElement) => {
                imgArr.push(pageElement.attribs.id);
            });
        }
        else if (urlSplit[0] === 'https://gelbooru.com') {
            html('.thumbnail-preview > a').each((pageElement) => {
                imgArr.push(pageElement.attribs.id);
            });
        }
        else {
            throw Error(`Invalid URL`);
        }
        return {
            name: html("input[name='tags']").val(),
            url: pageUrl.url,
            imageList: imgArr,
            visitAgain: false,
        };
    }
};
PageScrapper = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], PageScrapper);
exports.default = PageScrapper;
//# sourceMappingURL=scrapePage.function.js.map