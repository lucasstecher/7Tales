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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const createUrl_dto_1 = require("./dto/createUrl.dto");
const artistName_dto_1 = require("./dto/artistName.dto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async getNewContent() {
        return this.appService.getNewContents();
    }
    async saveArtist(pageUrl) {
        return this.appService.saveArtist(pageUrl);
    }
    async updateArtistImageList(artistName) {
        return this.appService.updateImageList(artistName);
    }
    async removeArtist(artistName) {
        return this.appService.deleteArtist(artistName);
    }
};
__decorate([
    (0, common_1.Get)('/contents'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getNewContent", null);
__decorate([
    (0, common_1.Post)('/save'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUrl_dto_1.PageUrlDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "saveArtist", null);
__decorate([
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artistName_dto_1.ArtistNameDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateArtistImageList", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artistName_dto_1.ArtistNameDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "removeArtist", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map