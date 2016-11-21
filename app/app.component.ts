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
    template: `<div class="header top-header">
    <a class="top-menu-toggler" href="javascript:;" (click)="toggleMenu()"></a>
    <div class="container container-menu" [class.shown]="menuShown">
        <div class="row">
            <div class="col-sm-12">
                <ul class="nav nav-tabs" style="padding-top: 10px; padding-bottom: 10px;">
                    <li role="presentation" *ngFor="let nav of navs">
                        <a (click)="goToPage([nav.uri])" href="javascript:;" style="padding: 0px 15px 0px 15px;">{{nav.label}}</a>
                    </li>
                    <li style="float: right; padding-right: 10px;" class="container-header-input">
                        <div class="form-inline" style="align: center;">
                            <input class="form-control" #verseSearch placeholder="Search any verse(s)..." (keyup)="searchVerse(verseSearch.value)"  />
                            <select class="form-control" #chapterSelect (change)="goToChapter(chapterSelect.value)">
                                <option *ngFor="let chapter of chapters" value="{{chapter.number}}" >{{chapter.getDisplayLabel()}}</option>
                            </select>
                            <select class="form-control" (change)="setLanguage($event.target.value)">
                                <option value="en">English</option>
                                <option value="ms">Bahasa</option>
                            </select>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="container" style="margin-top: 50px;">
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
}

.top-header
{
    position: fixed;
    width: 100%;
    top: 0px;
    background: white;
    height: inherit;
    z-index: 1;
}

.container-menu
{
    /*border-bottom: 1px solid #b7b7b7;*/
}

.shown
{
    display: block !important;
}

.top-menu-toggler
{
    display: none;
    padding-left: 10px;
    height: 25px;
    background: #d0a8a9;
    right: 0px;
    /*position: absolute;*/
    z-index: 10;
}

@media (max-width: 768px) {
    .top-menu-toggler {
        display: block;
    }
    
    .container-header-input input, .container-header-input select
    {
        margin-top: 5px;
    }
    
    .top-header .container-menu
    {
        display: none;
    }
    
    .container-menu .nav
    {
        border-bottom: 1px solid #efe2e2;
    }
    
    .container-header-input
    {
        float: none;
        width: 100%;
        text-align: center;
    }
}`]
})
@Injectable()
export class AppComponent implements OnInit{
    navs: Nav[];
    chapters: Chapter[];
    searchTimeout = null;
    searchedVerses: Verse[] = [];
    isSearching: boolean = false;
    menuShown: boolean = false;

    constructor(private quran: QuranService, private router: Router){}

    ngOnInit(): void {
        this.navs = [
            {label: 'Home', uri: '/'},
            {label: 'About', uri: '/about'}
        ];

        this.quran.getChapters().then(chapters => this.chapters = chapters);
    }

    goToChapter(number): void {
        this.menuShown = false;
        this.router.navigate(['/chapter', number]);
    }

    goToPage(param): void {
        this.menuShown = false;

        this.router.navigate(param);
    }

    setLanguage(lang: string): void {
        this.quran.setLanguage(lang);

        this.menuShown = false;
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
                this.menuShown = false;
                this.searchedVerses = verses;
            });

        }, 500);
    }

    toggleMenu(): void {
        this.menuShown = this.menuShown ? false : true;
    }
}