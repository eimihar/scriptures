import {Component, Injectable, OnInit} from "@angular/core";
import {Chapter} from "./chapter";
import {QuranService} from "../quran.service";

@Component({
    moduleId: module.id,
    selector: 'chapter-list',
    // template: ``
    template: `<style type="text/css">
.chapter-list .col-sm-1
{
    padding: 5px;
}
</style>
<h2>All Chapters</h2>
<div class="row" class="chapter-list">
    <div class="col-lg-2 col-sm-3" *ngFor="let chapter of chapters">
        <a [routerLink]="['/chapter', chapter.number]">{{chapter.getDisplayLabel()}}</a>
    </div>
</div>`
})
@Injectable()
export class ChapterListComponent implements OnInit{
    protected chapters: Chapter[];

    constructor(private quran: QuranService){
    }

    ngOnInit(): void {
        this.quran.getChapters().then(chapters => {
            console.log(chapters);
            this.chapters = chapters;
        });
    }
}