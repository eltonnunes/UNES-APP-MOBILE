import { Component, ViewChild } from '@angular/core';
import { StatusBar } from 'ionic-native';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { AlertController } from 'ionic-angular';

import { Platform, MenuController, Nav } from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
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

                                  /*NativeStorage.setItem('auth_token', {property: this.retorno.Registros[0].UTA_TX_TOKEN, anotherProperty: undefined}).then(() => console.log('Stored item!'), error => console.error('Error storing item', error) );
                                  NativeStorage.setItem('auth_validate', {property: this.retorno.Registros[0].UTA_DT_VALIDADE, anotherProperty: undefined}).then(() => console.log('Stored item!'), error => console.error('Error storing item', error) );
                                  NativeStorage.setItem('nome', {property: this.retorno.Registros[0].PES_PESSOA.PES_TX_NOME, anotherProperty: undefined}).then(() => console.log('Stored item!'), error => console.error('Error storing item', error) );
                                  NativeStorage.setItem('email', {property: this.retorno.Registros[0].PES_PESSOA.PES_TX_EMAIL, anotherProperty: undefined}).then(() => console.log('Stored item!'), error => console.error('Error storing item', error) );
                                  */

                                  this.login = true;
                                  this.loggedIn = true;
                                  this.loginSemAcesso = false;

                                  // Redirect
                                  this.navCtrl.push(Home, { dados: this.retorno });

                                }else{
                                  this.login = true;
                                  this.errorLogin  = true;
                                  this.loginSemAcesso = true;
                                  this.showAlert('Erro','Ops! Não foi possível efetuar login.');
                                }
                              }
                              else{
                                this.login = true;
                                this.errorLogin  = true;
                                this.loginSemAcesso = false;
                                this.showAlert('Erro','Ops! Não foi possível efetuar login.');
                              }
                            }else{
                              if(this.username.length == 0 && this.password.length == 0)
                              {
                                this.showAlert('Erro','Ops! Porfavor preencha os dados de acesso.');
                              }else if(this.username.length == 0){
                                this.showAlert('Erro','Ops! Porfavor preencha o Usuário.');
                              }else if(this.password.length == 0){
                                this.showAlert('Erro','Ops! Porfavor preencha o Password.');
                              }



                            }

                          },
                          err => {
                            this.showAlert('Erro','Ops! Erro ao efetuar login.');
                             this.login = true;
                             this.errorLogin  = true;
                             this.loginSemAcesso = false;
                              console.log(err);
                          });




  }



}
