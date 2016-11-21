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
var quran_service_1 = require("../quran.service");
var ChapterListComponent = (function () {
    function ChapterListComponent(quran) {
        this.quran = quran;
    }
    ChapterListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.quran.getChapters().then(function (chapters) {
            console.log(chapters);
            _this.chapters = chapters;
        });
    };
    ChapterListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'chapter-list',
            // template: ``
            template: "<style type=\"text/css\">\n.chapter-list .col-sm-1\n{\n    padding: 5px;\n}\n</style>\n<h2>All Chapters</h2>\n<div class=\"row\" class=\"chapter-list\">\n    <div class=\"col-lg-2 col-sm-3\" *ngFor=\"let chapter of chapters\">\n        <a [routerLink]=\"['/chapter', chapter.number]\">{{chapter.getDisplayLabel()}}</a>\n    </div>\n</div>"
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [quran_service_1.QuranService])
    ], ChapterListComponent);
    return ChapterListComponent;
}());
exports.ChapterListComponent = ChapterListComponent;
//# sourceMappingURL=chapter-list.component.js.map