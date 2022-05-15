"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AppController = void 0;
var common_1 = require("@nestjs/common");
var axios_1 = require("axios");
var AppController = /** @class */ (function () {
    function AppController(appService) {
        this.appService = appService;
    }
    AppController.prototype.getHello = function () {
        return this.appService.getHello();
    };
    AppController.prototype.getToken = function (code) {
        console.log("code: ", code);
        var url = 'https://github.com/login/oauth/access_token?client_id=0e7191e436f9a25bef4c&client_secret=13b9e18a163d30eac948f520dcde9938647b40c9&code=' + code;
        axios_1.axios.post(url)
            .then(function (response) {
            console.log(response);
        })["catch"](function (error) {
            console.log(error);
        });
        return 'code';
    };
    __decorate([
        (0, common_1.Get)()
    ], AppController.prototype, "getHello");
    __decorate([
        (0, common_1.Get)('oauth/github/callback'),
        __param(0, (0, common_1.Query)('code'))
    ], AppController.prototype, "getToken");
    AppController = __decorate([
        (0, common_1.Controller)()
    ], AppController);
    return AppController;
}());
exports.AppController = AppController;
