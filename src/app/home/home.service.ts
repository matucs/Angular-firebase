import { Injectable } from "@angular/core";
import { HomeComponent } from './home.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

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
        return this.db.list('/users',).valueChanges();
    }
    addUsers(user: any ): void {
        this.db.list('users').push({ country: user.country, gender: user.gender, name: user.name  });
    }
}