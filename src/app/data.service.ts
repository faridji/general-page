import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class DataService {
    data: any[];

    constructor() {
        this.data = [];
    }

    getData(): any {
        return this.data;
    }

    setData(rec: any) {
        this.data.push(rec);
    }
}