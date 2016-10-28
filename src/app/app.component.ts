import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { ViewVideo } from '../pages/view-video/view-video';
import { TagVideo } from '../pages/tag-video/tag-video';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';

import { LoadingController } from 'ionic-angular';
import { ApiUnes } from '../providers/api-unes';
import { LoginService } from '../providers/login-service';
import { Retorno } from '../models/retorno';

@Component({
  templateUrl: 'app.html',
  providers:[ApiUnes]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = Login;
  pages: Array<{title: string, component: any}>;
  Tags: Retorno = new Retorno(Object[0],0,0,0, false);

  constructor(
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public menu: MenuController,
    public apiUnes: ApiUnes,
    public loginService: LoginService/*,
    public navCtrl: NavController,
    public navParams: NavParams*/
  ) {
    this.initializeApp();

    let token: string = window.localStorage.getItem('auth_token');
    if( token != undefined && token != '' ){
    this.loginService.getValidateToken()
                                        .subscribe(
                                            retorno => {
                                              this.nav.setRoot(Home, { dados: retorno });
                                              //console.log(retorno);
                                            },
                                            err => {
                                                //console.log(err);
                                            });
    }

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HelloIonicPage }//,
      /*{ title: 'My First List', component: ListPage },
      { title: 'View Video', component: ViewVideo }*/
    ];
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      StatusBar.overlaysWebView(true); // let status bar overlay webview
      StatusBar.backgroundColorByHexString('#ffffff'); // set status bar to white
    });
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000,
      dismissOnPageChange: true
    });
    loading.present();
  }

  openPage(page, tag) {
    this.presentLoading();
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component, { id: tag});
  }

  openPageTag(Titulo, tag) {
    this.presentLoading();
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(TagVideo, { id: tag });
  }
}
