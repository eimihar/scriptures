import {Verse} from "../verse/verse";
export class Chapter {
    constructor(public number: number, public title: string, public verses: Verse[]) {}

    getVerses(): Verse[] {
        return [];
    }
}