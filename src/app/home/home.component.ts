import { Component, OnInit, IterableDiffers } from '@angular/core';
import { CommentModel, IconsSrc, UserModel, ThisThatModel, ChartModel } from './home.model';
import { Icons } from './../../assets/icons';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeService } from './home.service';
import { Observable } from 'rxjs';


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
  countries = new Array<any>();
  dataMale = new Array<ChartModel>();
  dataFemale = new Array<ChartModel>();


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
      this.getCountries();
      //this.service.addUsers(this.user);
      this.setGender();


    });
  }
  setDataForChart() {

  }

  onThisThatClicked(loveIt: boolean) {
    var _this = 0;
    var _that = 0;
    loveIt ? _this = 1 : _that = 1;
    this.service.updateThisThats(this.thisthats, _this, _that);
  }

  getGendersBasedOnCountries(gender: string, country: string) {
    this.service.getUsers().subscribe(r => {
      var temp = r.filter(t => t.gender == gender && t.country == country);
      //if (temp.length > 0) {
      var item = new ChartModel();
      item = { country: country, gender: gender, value: temp.length }
      if (item.gender == 'Male') {
        this.dataMale.push(item);
      } else if (item.gender == 'Female') {
        this.dataFemale.push(item);
      }
      // temp.map(t => {
      //   item = { country: t.country, gender: t.gender, value: temp.length }
      //   if (item.gender == 'Male') {
      //     this.dataMale.push(item.value);
      //   } else if (item.gender == 'Female') {
      //     this.dataFemale.push(item.value);
      //   }
      // })
      // }      
    });
  }
  setGender() {
    this.service.getUsers().subscribe(r => {
      this.users.push(r)
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
  getCountries() {
    this.service.getCountries().subscribe(r => {
      r.map(t => {
        this.countries.push(t);
      })

      this.user.countryId = Math.floor(Math.random() * this.countries.length) + 1;
      this.user.img = this._sanitizer.bypassSecurityTrustResourceUrl(this.countries[this.user.countryId - 1].flag);
      this.user.country = this.countries[this.user.countryId - 1].name;
      this.user.gender = Math.floor(Math.random() * 2) + 1 == 1 ? 'Female' : 'Male';
      this.username = "user_" + Math.floor(Math.random() * 20000) + 1;
      this.user.name = this.username;

      this.countries.map(c => {
        this.getGendersBasedOnCountries('Male', c.name);
        this.getGendersBasedOnCountries('Female', c.name);
      })

    })
  }
  ngOnInit() {
  }

}

