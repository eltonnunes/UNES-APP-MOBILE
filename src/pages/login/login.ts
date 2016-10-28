import { Component, ViewChild } from '@angular/core';
import { StatusBar } from 'ionic-native';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { AlertController } from 'ionic-angular';

import { Platform, MenuController, Nav } from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { ListPage } from '../list/list';
import { Home } from '../home/home';

import { ApiUnes } from '../../providers/api-unes';
import { LoginService } from '../../providers/login-service';
import { Retorno } from '../../models/retorno';
import { Usuarioalias } from '../../models/usuarioalias';

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
  Tags: Retorno = new Retorno(Object[0],0,0,0, false);
  retorno               : Retorno = new Retorno(Object[0],0,0,0, false);

  loginSemAcesso        : Boolean = false;
  login                 : Boolean = true;
  loggedIn              : Boolean = false;
  errorLogin            : Boolean = false;
  token: string = '##';

  constructor(
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public menu: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiUnes: ApiUnes,
    public loginService: LoginService,
    public alertCtrl: AlertController
  ) {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      /*this.token = <string> window.localStorage.getItem('auth_token');
      if( this.token != undefined && this.token != '' )
      {
        this.navCtrl.push(ListPage);
      }*/

    });

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HelloIonicPage }
    ];

  }

  ionViewDidLoad() {
    //console.log('Hello Login Page');
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: "Ops! Aguarde...",
      duration: 3000,
      dismissOnPageChange: true
    });
    loading.present();
  }

  showAlert(title, mensage) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: mensage,
      buttons: ['OK']
    });
    alert.present();
  }

  Autenticar(){

    if(this.login)
    {
      this.login = false;
      this.loginService.Autenticar({ 'usuario' : this.username, 'senha' : this.password })
                        .subscribe(
                            retorno => {

                              if(this.username.length != 0 && this.password.length != 0)
                              {
                                if( retorno.Registros != null)
                                {
                                  this.retorno = retorno;
                                  if(this.retorno.Registros[0] != false)
                                  {

                                    let dadosUser : Usuarioalias = <Usuarioalias> this.retorno.Registros[0];
                                    window.localStorage.setItem('auth_token', this.retorno.Registros[0].UTA_TX_TOKEN);

                                    this.login = true;
                                    this.loggedIn = true;
                                    this.loginSemAcesso = false;

                                    // Redirect
                                    this.navCtrl.push(Home, { dados: this.retorno });

                                  }else{
                                    this.login = true;
                                    this.errorLogin  = true;
                                    this.loginSemAcesso = true;
                                    this.showAlert('Erro','Ops! Usuário ou Password inválido.');
                                  }
                                }
                                else{
                                  this.login = true;
                                  this.errorLogin  = true;
                                  this.loginSemAcesso = false;
                                  this.showAlert('Erro','Ops! Não foi possível efetuar login.');
                                }
                              }else{
                                this.login = true;
                                if(this.username.length == 0 && this.password.length == 0)
                                {
                                  this.showAlert('Erro','Ops! Por favor preencha os dados de acesso.');
                                }else if(this.username.length == 0){
                                  this.showAlert('Erro','Ops! Por favor preencha o Usuário.');
                                }else if(this.password.length == 0){
                                  this.showAlert('Erro','Ops! Por favor preencha o Password.');
                                }



                              }

                            },
                            err => {
                              this.login = true;
                              this.showAlert('Erro','Ops! Erro ao efetuar login.');
                               this.login = true;
                               this.errorLogin  = true;
                               this.loginSemAcesso = false;
                                console.log(err);
                            });


      }

  }



}
