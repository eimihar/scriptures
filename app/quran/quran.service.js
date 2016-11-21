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
var verse_1 = require("./verse/verse");
var chapter_1 = require("./chapter/chapter");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var QuranService = (function () {
    function QuranService(http) {
        this.http = http;
        this.chapters = {};
        this.names = {};
        this.events = {
            languageChange: {}
        };
        this.lang = 'en';
        this.translation = 'en.yusufali';
        this.chapters[this.translation] = [];
    }
    QuranService.prototype.prepareChapters = function (response) {
        var _this = this;
        // and load the names.
        return this.getNames().then(function (nameResponse) {
            var res = nameResponse.json();
            var verses = response.json()[_this.translation];
            var chapters = {};
            for (var id in verses) {
                var verse = verses[id];
                if (!chapters[verse.surah])
                    chapters[verse.surah] = [];
                chapters[verse.surah].push(new verse_1.Verse(verse.surah, verse.ayah, verse.verse));
            }
            for (var number in chapters) {
                var title = res[number].title;
                var anglicized_title = res[number].anglicized_title;
                _this.chapters[_this.translation].push(new chapter_1.Chapter(+number, title, anglicized_title, chapters[number]));
            }
            return _this.chapters[_this.translation];
        });
    };
    QuranService.prototype.setLanguage = function (lang) {
        var _this = this;
        var translations = {
            en: 'en.yusufali',
            ms: 'ms.basmeih'
        };
        this.lang = lang;
        this.translation = translations[lang];
        if (!this.chapters[this.translation])
            this.chapters[this.translation] = [];
        return this.getChapters().then(function (chapters) {
            for (var key in _this.events.languageChange)
                _this.events.languageChange[key]();
            return chapters;
        });
    };
    QuranService.prototype.getNames = function () {
        var _this = this;
        var map = {
            en: 'en.chapters_name.json',
            ms: 'ms.chapters_name.json'
        };
        if (this.names[map[this.lang]])
            return new Promise(function (promise) { return promise(); }).then(function () {
                return _this.names[map[_this.lang]];
            });
        return this.names[map[this.lang]] = this.http.get('/resources/' + map[this.lang])
            .toPromise();
    };
    QuranService.prototype.getChapters = function () {
        var _this = this;
        if (this.chapters[this.translation].length > 0)
            return new Promise(function (resolve) { return resolve(); }).then(function () {
                return _this.chapters[_this.translation];
            });
        if (this.loadingChapters)
            return this.loadingChapters;
        return this.loadingChapters = this.http.get('/resources/translations/' + this.translation + '.json')
            .toPromise()
            .then(function (response) { _this.loadingChapters = null; return response; })
            .then(function (response) { return _this.prepareChapters(response); });
    };
    QuranService.prototype.searchVerses = function (text) {
        return this.getChapters().then(function (chapters) {
            var matches = [];
            for (var i in chapters) {
                for (var x in chapters[i].verses) {
                    var verse = chapters[i].verses[x].text;
                    if (!verse)
                        continue;
                    if (verse.search(text) != -1)
                        matches.push(chapters[i].verses[x]);
                }
            }
            return matches;
        });
    };
    QuranService.prototype.getChapter = function (number) {
        return this.getChapters()
            .then(function (chapters) {
            for (var i in chapters) {
                if (chapters[i].number == number)
                    return chapters[i];
            }
        });
    };
    QuranService.prototype.onTranslationChange = function (name, callback) {
        this.events.languageChange[name] = callback;
    };
    QuranService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], QuranService);
    return QuranService;
}());
exports.QuranService = QuranService;
//# sourceMappingURL=quran.service.js.map