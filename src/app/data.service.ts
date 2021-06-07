import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class DataService {
    data: any[];

    constructor(private store: AngularFirestore) {
        this.data = [];
    }

    getData(slug: string): Observable<any> {
        return this.store.collection(slug).valueChanges({ idField: 'id' }) as Observable<any[]>;
    }

    setData(slug: string, rec: any) {
        this.store.collection(slug).add(rec);
    }
}