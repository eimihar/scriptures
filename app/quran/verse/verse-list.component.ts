import {Component} from "@angular/core";
import {Verse} from "./verse";
@Component({
    moduleId: module.id,
    selector: 'verse-list',
    template: ``
})
export class VerseListComponent {
    protected verses: Verse[];
}