"use strict";
var Chapter = (function () {
    function Chapter(number, title, verses) {
        this.number = number;
        this.title = title;
        this.verses = verses;
    }
    Chapter.prototype.getVerses = function () {
        return [];
    };
    return Chapter;
}());
exports.Chapter = Chapter;
//# sourceMappingURL=chapter.js.map