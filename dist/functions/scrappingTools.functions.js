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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const axios_1 = require("@nestjs/axios");
const cheerio = require("cheerio");
let ScrappingTools = class ScrappingTools {
    constructor(artistModel, httpService) {
        this.artistModel = artistModel;
        this.httpService = httpService;
    }
    async findArtist(artistName) {
        let artistResult;
        try {
            artistResult = await this.artistModel.findOne({
                name: artistName,
            });
        }
        catch (e) {
            throw new Error(e);
        }
        return artistResult;
    }
    async getAllArtists() {
        let artistDbResult;
        try {
            artistDbResult = await this.artistModel.find();
        }
        catch (e) {
            throw new Error(e);
        }
        return artistDbResult;
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
    async verifyNewContent(pageUrl) {
        let dbUpdateResult;
        try {
            const scrappedPageResult = await this.getPageContent(pageUrl);
            const dbFindArtist = await this.artistModel.findOne({
                name: scrappedPageResult.name,
            });
            if (JSON.stringify(dbFindArtist.imageList) !==
                JSON.stringify(scrappedPageResult.imageList)) {
                try {
                    dbUpdateResult = await this.artistModel.updateOne({ name: scrappedPageResult.name }, {
                        $set: {
                            visitAgain: true,
                        },
                    });
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        }
        catch (e) {
            throw new Error(e);
        }
        return dbUpdateResult;
    }
    async cronJobFunction() {
        try {
            const artistsList = await this.getAllArtists();
            for (let i = 0; i < artistsList.length; i++) {
                await this.verifyNewContent({ url: artistsList[i].url });
            }
        }
        catch (e) {
            throw new Error(e);
        }
    }
};
ScrappingTools = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Artist')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        axios_1.HttpService])
], ScrappingTools);
exports.default = ScrappingTools;
//# sourceMappingURL=scrappingTools.functions.js.map