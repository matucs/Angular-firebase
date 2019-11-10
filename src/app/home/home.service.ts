import { Injectable } from "@angular/core";
import { HomeComponent } from './home.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, of } from 'rxjs';
import { UserModel } from './home.model';

@Injectable({
    providedIn: 'root' 
})
export class HomeService {
    db: AngularFireDatabase;
    constructor(db: AngularFireDatabase) {
        this.db = db;
    }
    getThisThats(): Observable<any> {
        return this.db.list('/this-that').valueChanges();
    }
    updateThisThats(thisthat: any , _this: number, _that: number): void {
        this.db.object('/this-that')
        .update({ this: Number(thisthat.This) + _this , that: Number(thisthat.That) + _that });
    }
    getUsers(): Observable<any> {
        return this.db.list('/users').valueChanges();
    }
    getCountries() {
        return this.db.list('/countries').valueChanges();
    }
}