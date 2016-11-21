import {Verse} from "../verse/verse";
export class Chapter {
    constructor(public number: number, public title: string, public anglicized_title: string, public verses: Verse[]) {}

    getVerses(): Verse[] {
        return [];
    }

    getDisplayLabel(): string {
        return this.number+'. '+this.title;
    }
}