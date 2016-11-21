"use strict";
var Chapter = (function () {
    function Chapter(number, title, anglicized_title, verses) {
        this.number = number;
        this.title = title;
        this.anglicized_title = anglicized_title;
        this.verses = verses;
    }
    Chapter.prototype.getVerses = function () {
        return [];
    };
    Chapter.prototype.getDisplayLabel = function () {
        return this.number + '. ' + this.title;
    };
    return Chapter;
}());
exports.Chapter = Chapter;
//# sourceMappingURL=chapter.js.map