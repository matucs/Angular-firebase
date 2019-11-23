import { Injectable } from "@angular/core";
import { HomeComponent } from './home.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, of } from 'rxjs';
import { UserModel } from './home.model';

@Injectable()
export class HomeService {
    db: AngularFireDatabase;
    constructor(db: AngularFireDatabase) {
        this.db = db;
    }
    getThisThats(): Observable<any> {
        return this.db.list('thisThats/1').valueChanges();
    }
    updateThisThats(thisthat: any, _this: number, _that: number): void {
        this.db.object('thisThats/1')
            .update({ this: Number(thisthat.This) + _this, that: Number(thisthat.That) + _that });
    }
    getUsers(): Observable<any> {
        return this.db.list('/users').valueChanges();
    }
     addUsers(user: UserModel){
        this.db.list('/users').push({
            name: user.name,
            gender: user.gender,
            country: user.country
        });
    }
    getCountries(): Observable<any> {
        return this.db.list('/countries').valueChanges();
    }
}