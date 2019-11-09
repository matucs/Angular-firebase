import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import { CommentModel, IconsSrc } from './home.model';
import { Icons } from './../../assets/icons';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  This: string;
  That: string;
  imgUrl: string;
  likes: string;
  shares: string;
  votes: number;
  reach: any;
  comments = new Array<CommentModel>();
  male: number;
  female: number;
  icons = new IconsSrc();


  constructor(db: AngularFireDatabase, private _sanitizer: DomSanitizer) {
    var temp = db.list('/this-that').valueChanges().subscribe(tt => {
      this.imgUrl = tt[1].toString();
      this.likes = tt[2].toString();
      this.shares = tt[4].toString();
      this.This = tt[6].toString();
      this.That = tt[5].toString();
      this.votes = Number(this.This) + Number(this.That);
      this.reach = tt[3];
      var temp: any = tt[0];
      var Iconbase64 = new Icons();
      this.icons.thisThat = this._sanitizer.bypassSecurityTrustResourceUrl(Iconbase64.thisThat);
      this.icons.createPoll = this._sanitizer.bypassSecurityTrustResourceUrl(Iconbase64.createPoll);
      this.icons.dashboard = this._sanitizer.bypassSecurityTrustResourceUrl(Iconbase64.dashboard);
      this.icons.gender = this._sanitizer.bypassSecurityTrustResourceUrl(Iconbase64.gender);
      this.icons.like = this._sanitizer.bypassSecurityTrustResourceUrl(Iconbase64.like);
      this.icons.managePoll = this._sanitizer.bypassSecurityTrustResourceUrl(Iconbase64.managePoll);
      this.icons.publishAndPromote = this._sanitizer.bypassSecurityTrustResourceUrl(Iconbase64.publishAndPromote);
      this.icons.share = this._sanitizer.bypassSecurityTrustResourceUrl(Iconbase64.share);
      this.icons.tT = this._sanitizer.bypassSecurityTrustResourceUrl(Iconbase64.tT);
      this.icons.thread = this._sanitizer.bypassSecurityTrustResourceUrl(Iconbase64.thread);
      this.icons.tick = this._sanitizer.bypassSecurityTrustResourceUrl(Iconbase64.tick);
      this.icons.total = this._sanitizer.bypassSecurityTrustResourceUrl(Iconbase64.total);

      temp.map(r => {
        var comment = new CommentModel();
        comment.content = r.content;
        comment.parentId = r.parentId;
        comment.user = r.user;
        this.comments.push(comment)
      })
      this.female = this.comments.filter(r => r.user.gender == 'Female').length
      this.male = this.comments.filter(r => r.user.gender == 'male').length
      console.log(this.comments)
      console.log(tt)
    });
  }

  ngOnInit() {
  }

}
