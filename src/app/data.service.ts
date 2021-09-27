import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class DataService {
    constructor(private store: AngularFirestore) {}

    getData(slug: string): Observable<any> {
        return this.store.collection(slug).valueChanges({ idField: 'id' }) as Observable<any[]>;
    }

    searchByName(slug: string, search: any): Observable<any> {
        const collectionRef = this.store.collection(slug, ref => {
            return ref.where('name', '>=', search).where('name', '<=', search + '~')
        });

        return collectionRef.valueChanges() as Observable<any[]>;
    }

    setData(slug: string, rec: any) {
        this.store.collection(slug).add(rec);
    }

    deleteData(slug: string, rec: any): Promise<void> {
        return this.store.collection(slug).doc(rec.id).delete();
    }

    updateData(slug: string, rec: any): Promise<void>{
        return this.store.collection(slug).doc(rec.id).update(rec);
    }
}