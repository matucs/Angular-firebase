import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import { CommentModel, IconsSrc, UserModel, ThisThatModel } from './home.model';
import { Icons, Flags } from './../../assets/icons';
import { DomSanitizer } from '@angular/platform-browser';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { HomeService } from './home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  thisthats = new ThisThatModel();
  users = new Array<UserModel>();
  male = 0;
  female = 0;
  icons = new IconsSrc();
  user = new UserModel();
  username = "";
  maleChartData: [];
  femaleChartData: [];


  constructor(private service: HomeService, private _sanitizer: DomSanitizer) {
    var temp = this.service.getThisThats().subscribe(tt => {
      this.thisthats.imgUrl = tt[1].toString();
      this.thisthats.likes = tt[2].toString();
      this.thisthats.shares = tt[4].toString();
      this.thisthats.This = tt[6].toString();
      this.thisthats.That = tt[5].toString();
      this.thisthats.votes = Number(this.thisthats.This) + Number(this.thisthats.That);
      this.thisthats.reach = tt[3];
      var temp: any = tt[0];
      temp.map(r => {
        var comment = new CommentModel();
        comment.content = r.content;
        comment.parentId = r.parentId;
        comment.user = r.user;
        this.thisthats.comments.push(comment)
      })

      this.setIcons();
      this.getUser();
      this.service.addUsers(this.user);
      this.setGender();
      this.getGendersBasedOnCountries();

    });
  }
  onThisThatClicked(loveIt: boolean) {
    var _this = 0;
    var _that = 0;
    loveIt ? _this = 1 : _that = 1;
    this.service.updateThisThats(this.thisthats, _this, _that);
  }

  getGendersBasedOnCountries() {
    this.service.getUsers().subscribe(r => {
      this.maleChartData = groupBy(r, 'country');
      console.log(this.maleChartData.keys)
      for(let value in Object.values(this.maleChartData)){
      
      }
    });
    console.log(this.maleChartData)
}
setGender() {
  this.service.getUsers().subscribe(r => {
    this.male = r.filter(t => t.gender == 'Male').length;
    this.female = r.filter(t => t.gender == 'Female').length;
  });
}
setIcons() {
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
  this.icons.message = this._sanitizer.bypassSecurityTrustResourceUrl(Iconbase64.message);
}
getUser() {
  this.user.countryId = Math.floor(Math.random() * 5) + 1;
  var path = new Flags().icon.filter(r => r.id == this.user.countryId)[0].path;
  this.user.img = "./../../assets/flags/" + path;
  this.user.country = path.substring(0, path.length - 4);
  this.user.gender = Math.floor(Math.random() * 2) + 1 == 1 ? 'Female' : 'Male';
  this.username = "user_" + Math.floor(Math.random() * 20000) + 1;
  this.user.name = this.username;
}
ngOnInit() {
}

}
const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

