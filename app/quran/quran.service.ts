import {Verse} from "./verse/verse";
import {Chapter} from "./chapter/chapter";
import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class QuranService {
    lang: string;
    chapters: Object = {};
    names: Object = {};
    translation: string;
    events = {
        languageChange: {}
    };
    loadingChapters: Promise<Chapter[]>;

    constructor(private http: Http){
        this.lang = 'en';
        this.translation = 'en.yusufali';
        this.chapters[this.translation] = [];
    }

    prepareChapters(response: Response) {
        // and load the names.
        return this.getNames().then((nameResponse: Response) => {
            var res = nameResponse.json();

            var verses: Object = response.json()[this.translation];

            var chapters = {};

            for(var id in verses)
            {
                var verse = verses[id];

                if(!chapters[verse.surah])
                    chapters[verse.surah] = [];

                chapters[verse.surah].push(new Verse(verse.surah, verse.ayah, verse.verse));
            }

            for(var number in chapters) {
                var title = res[number].title;
                var anglicized_title = res[number].anglicized_title;

                this.chapters[this.translation].push(new Chapter(+number, title, anglicized_title, chapters[number]));
            }

            return this.chapters[this.translation];
        });
    }

    setLanguage(lang: string): Promise<Chapter[]> {
        var translations = {
            en: 'en.yusufali',
            ms: 'ms.basmeih'
        };

        this.lang = lang;
        this.translation = translations[lang];

        if(!this.chapters[this.translation])
            this.chapters[this.translation] = [];

        return this.getChapters().then(chapters => {
            for(var key in this.events.languageChange)
                this.events.languageChange[key]();

            return chapters;
        });
    }

    getNames(): Promise<Object> {
        var map = {
            en: 'en.chapters_name.json',
            ms: 'ms.chapters_name.json'
        };

        if(this.names[map[this.lang]])
            return new Promise<Object>(promise => promise()).then(() => {
                return this.names[map[this.lang]];
            });

        return this.names[map[this.lang]] = this.http.get('/resources/'+map[this.lang])
            .toPromise();
    }

    getChapters(): Promise<Chapter[]> {
        if(this.chapters[this.translation].length > 0)
            return new Promise<Chapter[]>(resolve => resolve()).then(() => {

                return this.chapters[this.translation];
            });

        if(this.loadingChapters)
            return this.loadingChapters;

        return this.loadingChapters = this.http.get('/resources/translations/' + this.translation + '.json')
            .toPromise()
            .then(response => {this.loadingChapters = null; return response;})
            .then(response => this.prepareChapters(response));
    }

    searchVerses(text: string): Promise<Verse[]> {
        return this.getChapters().then(chapters => {
            var matches = [];

            for(var i in chapters) {
                for(var x in chapters[i].verses) {
                    var verse = chapters[i].verses[x].text;

                    if(!verse)
                        continue;

                    if(verse.search(text) != -1)
                        matches.push(chapters[i].verses[x]);
                }
            }

            return matches;
        });
    }

    getChapter(number: number): Promise<Chapter> {
        return this.getChapters()
            .then((chapters: Chapter[]) => {
                for(var i in chapters)
                {
                    if(chapters[i].number == number)
                        return chapters[i];
                }
            });
    }

    onTranslationChange(name, callback): void {
        this.events.languageChange[name] = callback;
    }
}