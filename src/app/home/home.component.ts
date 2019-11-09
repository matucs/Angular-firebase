import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import { CommentModel } from './home.model';


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


  constructor(db: AngularFireDatabase) {
    var temp = db.list('/this-that').valueChanges().subscribe(tt => {
      this.imgUrl = tt[1].toString();
      this.likes = tt[2].toString();
      this.shares = tt[4].toString();
      this.This = tt[6].toString();
      this.That = tt[5].toString();
      this.votes = Number(this.This) + Number(this.That);
      this.reach = tt[3];
      var temp: any = tt[0];
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
