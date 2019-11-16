import { Injectable } from "@angular/core";
import { HomeComponent } from './home.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HomeService {
    db: AngularFireDatabase;
    constructor(db: AngularFireDatabase) {
        this.db = db;
    }
    getThisThats(id: number): Observable<any> {
        return this.db.list('/this-thats/' + id).valueChanges();
    }
    updateThisThatById(id: number, thisthat: any, _this: number, _that: number): void {
        this.db.object('/this-thats/'+ id)
            .update({ this: Number(thisthat.This) + _this, that: Number(thisthat.That) + _that });
    }
    getUsers(): Observable<any> {
        return this.db.list('/users').valueChanges();
    }
    getCountries() {
        return this.db.list('/countries').valueChanges();
    }
}