import {Component, OnInit} from "@angular/core";

@Component({
    moduleId: module.id,
    template: `
<chapter-list></chapter-list>
`
})
export class HomeComponent implements OnInit {
    title = 'All Surahs';

    ngOnInit(): void {
    }
}