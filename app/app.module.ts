import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule, Routes} from "@angular/router";

import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {VerseListComponent} from "./quran/verse/verse-list.component";
import {ChapterListComponent} from "./quran/chapter/chapter-list.component";

import {QuranService} from "./quran/quran.service";

import './rxjs-extensions';
import {ChapterComponent} from "./quran/chapter/chapter.component";
import {AboutComponent} from "./about/about.component";

var routes:Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'chapter/:id', component: ChapterComponent}
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        ChapterComponent,
        ChapterListComponent,
        VerseListComponent
    ],
    bootstrap: [AppComponent],
    providers: [QuranService]
})
export class AppModule {
}