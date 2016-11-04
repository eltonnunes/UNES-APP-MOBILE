import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { TagVideo } from '../tag-video/tag-video';
import { Login } from '../login/login';


import { ApiUnes } from '../../providers/api-unes';
import { LoginService } from '../../providers/login-service';
import { Retorno } from '../../models/retorno';

@Component({
  templateUrl: 'home.html',
  providers:[ApiUnes]
})
export class Home {

  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any= HelloIonicPage;
  rootPageParams: Retorno = new Retorno(Object[0],0,0,0, false);

  pages: Array<{title: string, component: any}>;
  Tags: Retorno = new Retorno(Object[0],0,0,0, false);
  dadosLogin: Retorno = new Retorno(Object[0],0,0,0, false);

  constructor(
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public menu: MenuController,
    public apiUnes: ApiUnes,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginService: LoginService
  ) {

    this.dadosLogin = navParams.get('dados');
    //this.dadosLogin = navParams.data;
    if(navParams.data == undefined){
      this.getDadosAcesso();
    }
    // set our app's pages
    this.pages = [
      { title: 'Home', component: HelloIonicPage }//,
    ];
  }

  ionViewCanEnter(){
    this.rootPageParams = this.navParams.get('dados');
    this.initializeApp();
  }

  getDadosAcesso(){

    if( this.dadosLogin.Registros == undefined ){
      let token: string = window.localStorage.getItem('auth_token');
      if( token != undefined && token != '' ){
      this.loginService.getValidateToken()
                                          .subscribe(
                                              retorno => {
                                                this.dadosLogin = retorno;
                                              },
                                              err => {
                                                  //console.log(err);
                                              });
      }
    }

  }

  getTagsMenu(){
    this.apiUnes.ListaTagsMenu()
                      .subscribe(
                          retorno => {
                            this.Tags = retorno;
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
    this.nav.setRoot(page.component, { id: tag, dados: this.dadosLogin});
  }

  openPageTag(Titulo, tag) {
    this.presentLoading();
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(TagVideo, { id: tag, dados: this.dadosLogin });
  }

  sair(){
    this.navCtrl.push(Login, { dados: '' });
  }

}
