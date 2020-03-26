import * as uid from 'uid';

export class ListElementData {
    public id: string;
    public title: string;

    constructor(title: string) {
        this.title = title;
        this.id = uid(10);
    }
}