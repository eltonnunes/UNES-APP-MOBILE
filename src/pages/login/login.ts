import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { Platform, MenuController, Nav } from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;
  username: string = '';
  password: string = '';

  constructor(
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public menu: MenuController
  ) {

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HelloIonicPage }
    ];

  }

  ionViewDidLoad() {
    console.log('Hello Login Page');
  }

  login(){
    console.log(this.username + ' - ' + this.password);
    this.openPage();

  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000,
      dismissOnPageChange: true
    });
    loading.present();
  }

  openPage() {
    this.presentLoading();
    // close the menu when clicking a link from the menu
    //this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(this.pages[0].component);
  }

}
