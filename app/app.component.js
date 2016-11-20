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
///<reference path="../node_modules/@types/node/index.d.ts"/>
var core_1 = require("@angular/core");
var quran_service_1 = require("./quran/quran.service");
var router_1 = require("@angular/router");
var AppComponent = (function () {
    function AppComponent(quran, router) {
        this.quran = quran;
        this.router = router;
        this.searchTimeout = null;
        this.searchedVerses = [];
        this.isSearching = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.navs = [
            { label: 'Home', uri: '/' },
            { label: 'About', uri: '/about' }
        ];
        this.quran.getChapters().then(function (chapters) { return _this.chapters = chapters; });
    };
    AppComponent.prototype.goToChapter = function (number) {
        this.router.navigate(['/chapter', number]);
    };
    AppComponent.prototype.setLanguage = function (lang) {
        this.quran.setLanguage(lang);
    };
    AppComponent.prototype.searchVerse = function (text) {
        var _this = this;
        clearTimeout(this.searchTimeout);
        if (!text) {
            this.isSearching = false;
            this.searchedVerses = [];
            return;
        }
        this.isSearching = true;
        this.searchTimeout = setTimeout(function () {
            _this.quran.searchVerses(text).then(function (verses) {
                _this.searchedVerses = verses;
            });
        }, 500);
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quran-app',
            template: "<div class=\"container\" style=\"margin-top: 100px;\">\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <ul class=\"nav nav-tabs\">\n                <li role=\"presentation\" *ngFor=\"let nav of navs\">\n                    <a routerLink=\"{{nav.uri}}\">{{nav.label}}</a>\n                </li>\n                <li style=\"float: right; \">\n                    <select class=\"form-control\" (change)=\"setLanguage($event.target.value)\">\n                        <option value=\"en\">English</option>\n                        <option value=\"ms\">Bahasa</option>\n                    </select>\n                </li>\n                <li style=\"float: right; padding-right: 10px;\">\n                    <select class=\"form-control\" #chapterSelect (change)=\"goToChapter(chapterSelect.value)\">\n                        <option *ngFor=\"let chapter of chapters\" value=\"{{chapter.number}}\" >{{chapter.title}}</option>\n                    </select>\n                </li>\n                <li style=\"float: right; padding-right: 10px;\">\n                    <input class=\"form-control\" #verseSearch placeholder=\"Search any verse(s)...\" (keyup)=\"searchVerse(verseSearch.value)\"  />\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div *ngIf=\"isSearching\" class=\"col-sm-12 search-list\">\n            <ul>\n                <li *ngFor=\"let verse of searchedVerses\">\n                    {{verse.text}} - <strong>{{verse.chapter_number}}:{{verse.number}}</strong>\n                </li>\n            </ul>\n        </div>\n        <div class=\"col-sm-12\" [class.hidden]=\"isSearching\">\n            <router-outlet></router-outlet>\n        </div>\n    </div>\n</div>",
            styles: ["*\n{\n    font-family: \"Times New Roman\";\n}\n\n.search-list ul\n{\n    list-style: none;\n    padding: 0px;\n}\n\n.search-list li\n{\n    font-size: 1.3em;\n    padding: 10px 0 10px 0;\n    border-bottom: 1px solid #d8d8d8;\n}"]
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [quran_service_1.QuranService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map