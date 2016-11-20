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
var core_1 = require("@angular/core");
var chapter_1 = require("./chapter");
var quran_service_1 = require("../quran.service");
var router_1 = require("@angular/router");
var ChapterComponent = (function () {
    function ChapterComponent(quran, route) {
        this.quran = quran;
        this.route = route;
    }
    ChapterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.quran.onTranslationChange('get_chapter', function () {
            _this.quran.getChapter(_this.chapter.number).then(function (chapter) { return _this.chapter = chapter; });
        });
        this.route.params
            .switchMap(function (params) { return _this.quran.getChapter(+params['id']); })
            .subscribe(function (chapter) { return _this.chapter = chapter; });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', chapter_1.Chapter)
    ], ChapterComponent.prototype, "chapter", void 0);
    ChapterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'chapter',
            template: "<style type=\"text/css\">\n.chapter-verses li\n{\n    font-size: 1.3em;\n}\n</style>\n<div *ngIf=\"chapter\">\n    <h1>{{chapter.title}}</h1>\n    <div class=\"chapter-verses\">\n        <ul style=\"list-style: none; padding: 0px;\">\n            <li *ngFor=\"let verse of chapter.verses\" style=\"padding: 10px 0 10px 0; border-bottom: 1px solid #d8d8d8;\">\n                <div>{{verse.text}} - <strong>{{chapter.number}}:{{verse.number}}</strong></div>\n            </li>\n        </ul>\n    </div>\n</div>\n"
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [quran_service_1.QuranService, router_1.ActivatedRoute])
    ], ChapterComponent);
    return ChapterComponent;
}());
exports.ChapterComponent = ChapterComponent;
//# sourceMappingURL=chapter.component.js.map