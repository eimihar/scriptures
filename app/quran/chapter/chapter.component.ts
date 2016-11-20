import {Component, Injectable, Input} from "@angular/core";
import {Chapter} from "./chapter";
import {QuranService} from "../quran.service";
import {ActivatedRoute, Params} from "@angular/router";
@Component({
    moduleId: module.id,
    selector: 'chapter',
    template: `<style type="text/css">
.chapter-verses li
{
    font-size: 1.3em;
}
</style>
<div *ngIf="chapter">
    <h1>{{chapter.title}}</h1>
    <div class="chapter-verses">
        <ul style="list-style: none; padding: 0px;">
            <li *ngFor="let verse of chapter.verses" style="padding: 10px 0 10px 0; border-bottom: 1px solid #d8d8d8;">
                <div>{{verse.text}} - <strong>{{chapter.number}}:{{verse.number}}</strong></div>
            </li>
        </ul>
    </div>
</div>
`
})
@Injectable()
export class ChapterComponent {
    @Input() chapter: Chapter;

    constructor(private quran: QuranService,
        private route: ActivatedRoute
    ){}

    ngOnInit(): void {
        this.quran.onTranslationChange('get_chapter', () => {
            this.quran.getChapter(this.chapter.number).then(chapter => this.chapter = chapter);
        });

        this.route.params
            .switchMap((params: Params) => this.quran.getChapter(+params['id']))
            .subscribe(chapter => this.chapter = chapter);
    }
}