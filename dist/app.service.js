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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const scrappingTools_functions_1 = require("./functions/scrappingTools.functions");
let AppService = class AppService {
    constructor(scrappingTools, artistModel) {
        this.scrappingTools = scrappingTools;
        this.artistModel = artistModel;
    }
    async saveArtist(pageUrl) {
        let createdArtist;
        try {
            const pageContent = await this.scrappingTools.getPageContent(pageUrl);
            createdArtist = new this.artistModel(pageContent).save();
        }
        catch (e) {
            throw new Error(e);
        }
        return !!createdArtist;
    }
    async getNewContents() {
        let newContents;
        try {
            newContents = await this.artistModel.find({ visitAgain: true });
        }
        catch (e) {
            throw new Error(e);
        }
        return newContents;
    }
    async updateImageList(artistName) {
        let dbUpdateImageListResult;
        const artistDbContent = await this.scrappingTools.findArtist(artistName.name);
        const artistScrappedContent = await this.scrappingTools.getPageContent({
            url: artistDbContent.url,
        });
        try {
            dbUpdateImageListResult = await this.artistModel.updateOne({ name: artistName }, {
                $set: {
                    visitAgain: false,
                    imageList: artistScrappedContent.imageList,
                },
            });
        }
        catch (e) {
            throw new Error(e);
        }
        return dbUpdateImageListResult;
    }
    async deleteArtist(artistName) {
        let dbDeleteArtist;
        try {
            dbDeleteArtist = await this.artistModel.deleteOne({
                name: artistName.name,
            });
        }
        catch (e) {
            throw new Error(e);
        }
        return dbDeleteArtist;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)('Artist')),
    __metadata("design:paramtypes", [scrappingTools_functions_1.default,
        mongoose_1.Model])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map