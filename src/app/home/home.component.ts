import { Component, OnInit, IterableDiffers } from '@angular/core';
import { CommentModel, IconsSrc, UserModel, ThisThatModel, ChartModel } from './home.model';
import { Icons } from './../../assets/icons';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeService } from './home.service';
import { Observable, of } from 'rxjs';
import { promise } from 'protractor';
import { reject } from 'q';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{ provide: HomeService, useClass: HomeService }]
})
export class HomeComponent implements OnInit {
  thisthats: ThisThatModel;
  users: UserModel[];
  male = 0;
  female = 0;
  icons = new IconsSrc();
  user;
  username = "";
  countries;
  countriesLable;
  dataMale;
  dataFemale;
  chartDataMale: number[] = [];
  chartDataFemale: number[] = [];
  tahtPercent = '0';
  thisPercent = '0';


  constructor(private service: HomeService, private _sanitizer: DomSanitizer) {
  }
  ngOnInit() {
    this.thisthats = new ThisThatModel();
    this.users = new Array<UserModel>();
    this.countries =[];
    this.countriesLable = [];
    this.dataMale = new Array<ChartModel>();
    this.dataFemale = new Array<ChartModel>();
    this.chartDataFemale = new Array<number>();
    this.chartDataMale = new Array<number>();
    this.user = new UserModel();
    this.service.getThisThats().subscribe(tt => {
      this.thisthats.imgUrl = tt[1].toString();
      this.thisthats.likes = tt[2].toString();
      this.thisthats.shares = tt[3].toString();
      this.thisthats.That = tt[4].toString();
      this.thisthats.This = tt[5].toString();
      this.thisthats.votes = Number(this.thisthats.This) + Number(this.thisthats.That);
      var temp: any = tt[0];
      this.thisPercent = ((Number(this.thisthats.This) / this.thisthats.votes) * 100).toFixed();
      this.tahtPercent = ((Number(this.thisthats.That) / this.thisthats.votes) * 100).toFixed();
      this.thisthats.comments = [];
      temp.map(r => {
        var comment = new CommentModel();
        comment.content = r.content;
        comment.parentId = r.parentId;
        comment.user = r.user;
        this.thisthats.comments.push(comment)
      })
    });
    this.setIcons();
    this.countries = this.getCountries();
    this.setGender();
  }

  getCountries() {
    var countries = [];
    this.service.getCountries().subscribe(r => {
      r.map(t => {
        countries.push(t);
        this.countriesLable.push(t.name);
      })
      this.setRandomUser();
    })
    return countries;
  }
  setRandomUser() {
    this.user.countryId = Math.floor(Math.random() * this.countries.length) + 1;
    this.user.img = this._sanitizer.bypassSecurityTrustResourceUrl(this.countries[this.user.countryId - 1].flag);
    this.user.country = this.countries[this.user.countryId - 1].name;
    this.user.gender = Math.floor(Math.random() * 2) + 1 == 1 ? 'Female' : 'Male';
    this.username = "user_" + Math.floor(Math.random() * 20000) + 1;
    this.user.name = this.username;
    this.service.addUsers(this.user)
    this.PrepareDataForChart();
  }
  PrepareDataForChart() {
    this.countries.map(c => {
      this.getGendersBasedOnCountries('Male', c.name);
      this.getGendersBasedOnCountries('Female', c.name);
    });
  }

  async getGendersBasedOnCountries(gender: string, country: string): Promise<number> {
    var item = new ChartModel();
     this.service.getUsers().subscribe(r => {
      var temp = r.filter(t => t.gender == gender && t.country == country);
      item = { country: country, gender: gender, value: temp.length }
      if (item.gender == 'Male') {
        this.dataMale.unshift(item);
        this.chartDataMale.unshift(item.value);
      } else if (item.gender == 'Female') {
        this.dataFemale.unshift(item);
        this.chartDataFemale.unshift(item.value);
      }
    })
    return item.value;
  }
  setGender() {
    this.service.getUsers().subscribe(r => {
      this.users.push(r)
      this.male = r.filter(t => t.gender == 'Male').length;
      this.female = r.filter(t => t.gender == 'Female').length;
    });
  }

  onThisThatClicked(loveIt: boolean) {
    var _this = 0;
    var _that = 0;
    loveIt ? _this = 1 : _that = 1;
    this.service.updateThisThats(this.thisthats, _this, _that);
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

}

