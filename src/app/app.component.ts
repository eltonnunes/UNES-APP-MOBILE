import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { ViewVideo } from '../pages/view-video/view-video';
import { TagVideo } from '../pages/tag-video/tag-video';
import { Login } from '../pages/login/login';

import { LoadingController } from 'ionic-angular';
import { ApiUnes } from '../providers/api-unes';
import { Retorno } from '../models/retorno';

@Component({
  templateUrl: 'app.html',
  providers:[ApiUnes]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;
  Tags: Retorno = new Retorno(Object[0],0,0,0, false);

  constructor(
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public menu: MenuController,
    public apiUnes: ApiUnes
    //public navCtrl: NavController,
    //public navParams: NavParams
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HelloIonicPage }//,
      /*{ title: 'My First List', component: ListPage },
      { title: 'View Video', component: ViewVideo }*/
    ];
  }

  getTagsMenu(){
    this.apiUnes.ListaTagsMenu()
                      .subscribe(
                          retorno => {
                            this.Tags = retorno;

                            /*for (let i = 0; i < retorno.Registros.length; i++) {
                                this.pages.push(  { title: retorno.Registros[i].UntTxNome, component: TagVideo } );
                            }*/

                          },
                          err => {
                              console.log(err);
                          });
  }

  initializeApp() {
    this.getTagsMenu();
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
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
