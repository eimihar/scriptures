///<reference path="../node_modules/@types/node/index.d.ts"/>
import {Component, OnInit, Injectable} from "@angular/core";
import {Nav} from "./nav/nav";
import {QuranService} from "./quran/quran.service";
import {Chapter} from "./quran/chapter/chapter";
import {Router} from "@angular/router";
import {Verse} from "./quran/verse/verse";

@Component({
    moduleId: module.id,
    selector: 'quran-app',
    template: `<div class="container" style="margin-top: 100px;">
    <div class="row">
        <div class="col-sm-12">
            <ul class="nav nav-tabs">
                <li role="presentation" *ngFor="let nav of navs">
                    <a routerLink="{{nav.uri}}">{{nav.label}}</a>
                </li>
                <li style="float: right; ">
                    <select class="form-control" (change)="setLanguage($event.target.value)">
                        <option value="en">English</option>
                        <option value="ms">Bahasa</option>
                    </select>
                </li>
                <li style="float: right; padding-right: 10px;">
                    <select class="form-control" #chapterSelect (change)="goToChapter(chapterSelect.value)">
                        <option *ngFor="let chapter of chapters" value="{{chapter.number}}" >{{chapter.title}}</option>
                    </select>
                </li>
                <li style="float: right; padding-right: 10px;">
                    <input class="form-control" #verseSearch placeholder="Search any verse(s)..." (keyup)="searchVerse(verseSearch.value)"  />
                </li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div *ngIf="isSearching" class="col-sm-12 search-list">
            <ul>
                <li *ngFor="let verse of searchedVerses">
                    {{verse.text}} - <strong>{{verse.chapter_number}}:{{verse.number}}</strong>
                </li>
            </ul>
        </div>
        <div class="col-sm-12" [class.hidden]="isSearching">
            <router-outlet></router-outlet>
        </div>
    </div>
</div>`,
    styles: [`*
{
    font-family: "Times New Roman";
}

.search-list ul
{
    list-style: none;
    padding: 0px;
}

.search-list li
{
    font-size: 1.3em;
    padding: 10px 0 10px 0;
    border-bottom: 1px solid #d8d8d8;
}`]
})
@Injectable()
export class AppComponent implements OnInit{
    navs: Nav[];
    chapters: Chapter[];
    searchTimeout = null;
    searchedVerses: Verse[] = [];
    isSearching: boolean = false;

    constructor(private quran: QuranService, private router: Router){}

    ngOnInit(): void {
        this.navs = [
            {label: 'Home', uri: '/'},
            {label: 'About', uri: '/about'}
        ];

        this.quran.getChapters().then(chapters => this.chapters = chapters);
    }

    goToChapter(number): void {
        this.router.navigate(['/chapter', number]);
    }

    setLanguage(lang: string): void {
        this.quran.setLanguage(lang);
    }

    searchVerse(text: string): void {
        clearTimeout(this.searchTimeout);

        if(!text)
        {
            this.isSearching = false;

            this.searchedVerses = [];

            return;
        }

        this.isSearching = true;

        this.searchTimeout = setTimeout(() => {
            this.quran.searchVerses(text).then((verses: Verse[]) => {
                this.searchedVerses = verses;
            });

        }, 500);
    }
}