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
const scrapePage_function_1 = require("../functions/scrapePage.function");
let VerifyNewContent = class VerifyNewContent {
    constructor(pageScrapper, artistModel) {
        this.pageScrapper = pageScrapper;
        this.artistModel = artistModel;
    }
    async verifyNewContent(pageUrl) {
        let dbUpdateResult;
        try {
            const scrappedPageResult = await this.pageScrapper.getPageContent(pageUrl);
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
};
VerifyNewContent = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)('Artist')),
    __metadata("design:paramtypes", [scrapePage_function_1.default,
        mongoose_1.Model])
], VerifyNewContent);
exports.default = VerifyNewContent;
//# sourceMappingURL=verifyNewContent.function.js.map