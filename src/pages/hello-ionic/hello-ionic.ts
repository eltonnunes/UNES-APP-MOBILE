import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Response } from '@angular/http';

import { ApiUnes } from '../../providers/api-unes';
import { LoginService } from '../../providers/login-service';
import { Retorno } from '../../models/retorno';

import { ViewVideo } from '../view-video/view-video';
import { TagVideo } from '../tag-video/tag-video';


@Component({
  templateUrl: 'hello-ionic.html',
  providers:[ApiUnes]
})
export class HelloIonicPage {

  protocol: string = '';
  tabs: string = "todos";
  resultadoConsulta: Boolean = false;
  load: Boolean = false;
  pgTodos: number = 1;
  pgMaisVistos: number = 1;
  pgMaisRecentes: number = 1;

  Tags: Retorno = new Retorno(Object[0],0,0,0, false);
  Perfis: Retorno = new Retorno(Object[0],0,0,0, false);
  Videos: Retorno = new Retorno(Object[0],0,0,0, false);
  VideosMaisVistos: Retorno = new Retorno(Object[0],0,0,0, false);
  VideosMaisRecentes: Retorno = new Retorno(Object[0],0,0,0, false);
  VideosTags: Retorno = new Retorno(Object[0],0,0,0, false);
  VideosBusca: Retorno = new Retorno(Object[0],0,0,0, false);
  dadosLogin: Retorno = new Retorno(Object[0],0,0,0, false);


  constructor(
              public loadingCtrl: LoadingController,
              private apiUnes: ApiUnes,
              public navCtrl: NavController,
              public navParams: NavParams,
              public loginService: LoginService) {

      this.protocol = 'https:';
      this.presentLoading();
      this.getTagsMenu();
      this.getPerfis();
      this.getVideos(this.pgTodos);
      this.getVideosMaisVistos(this.pgMaisVistos);
      this.getVideosMaisRecentes(this.pgMaisRecentes);




  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: "Ops! Aguarde...",
      duration: 3000,
      dismissOnPageChange: true
    });
    loading.present();
  }

  playVideo($event, card){

    //console.log(card.UNV_ID_VIDEOS);
    let returnOperation: Response;
    this.apiUnes.AtualizaViewVideo({ VIDEOS : { UNV_ID_VIDEOS: card.UNV_ID_VIDEOS }}).subscribe(
        retorno => { returnOperation = retorno; /*console.log(retorno);*/ },
        err => { console.log(err) });
    this.navCtrl.push(ViewVideo, { item: card });
  }


  getTagsMenu(){
    this.apiUnes.ListaTagsMenu()
                      .subscribe(
                          retorno => {
                            this.resultadoConsulta = false;
                            this.Tags = retorno;
                            //this.loginService.Validate(retorno.Token);
                            if(this.Tags.Registros != null)
                              this.load = false;
                            else
                              this.load = false;
                          },
                          err => {
                              console.log(err);
                              this.load = false;
                          });
    //console.log(this.resultadoConsulta);
  }

  getPerfis(){

      this.apiUnes.ListaPerfis()
                        .subscribe(
                            retorno => {
                              //this.resultadoConsulta = false;
                              this.Perfis = retorno;
                              //this.loginService.Validate(retorno.Token);
                              if(this.Tags.Registros != null)
                                this.load = false;
                              else
                                this.load = false;
                            },
                            err => {
                                console.log(err);
                                this.load = false;
                            });
                            //console.log(this.resultadoConsulta);
    }

  getVideos(pg){
    this.apiUnes.ListaVideos(pg)
                      .subscribe(
                          retorno => {
                            //this.loginService.Validate(retorno.Token);
                            if(retorno.Registros == null)
                              this.resultadoConsulta = true;
                            else if(retorno.Registros.length == 0)
                                this.resultadoConsulta = true;
                            else
                              this.resultadoConsulta = false;

                            this.Videos = retorno;
                            if(this.Videos.Registros != null)
                              this.load = false;
                            else
                              this.load = false;
                          },
                          err => {
                              console.log(err);
                              this.load = false;
                          });
                          //console.log(this.resultadoConsulta);
  }

  getVideosMaisVistos(pg){
    this.apiUnes.ListaVideosMaisVistos(pg)
                      .subscribe(
                          retorno => {
                            //this.loginService.Validate(retorno.Token);
                            if(retorno.Registros == null)
                              this.resultadoConsulta = true;
                            else if(retorno.Registros.length == 0)
                                this.resultadoConsulta = true;
                            else
                              this.resultadoConsulta = false;

                            this.VideosMaisVistos = retorno;
                            if(this.VideosMaisVistos.Registros != null)
                              this.load = false;
                            else
                              this.load = false;
                          },
                          err => {
                              console.log(err);
                              this.load = false;
                          });
                          //console.log(this.resultadoConsulta);
  }

  getVideosMaisRecentes(pg){
    this.apiUnes.ListaVideosMaisRecentes(pg)
                      .subscribe(
                          retorno => {
                            //this.loginService.Validate(retorno.Token);
                            if(retorno.Registros == null)
                              this.resultadoConsulta = true;
                            else if(retorno.Registros.length == 0)
                                this.resultadoConsulta = true;
                            else
                              this.resultadoConsulta = false;

                            this.VideosMaisRecentes = retorno;
                            if(this.VideosMaisRecentes.Registros != null)
                              this.load = false;
                            else
                              this.load = false;
                          },
                          err => {
                              console.log(err);
                              this.load = false;
                          });
                          //console.log(this.resultadoConsulta);
  }

  getVideosTags(pg, querystring){
    this.apiUnes.ListaVideosTags(pg, querystring)
                      .subscribe(
                          retorno => {
                            //this.loginService.Validate(retorno.Token);
                            if(retorno.Registros == null)
                              this.resultadoConsulta = true;
                            else if(retorno.Registros.length == 0)
                                this.resultadoConsulta = true;
                            else
                              this.resultadoConsulta = false;

                            this.VideosTags = retorno;
                            if(this.VideosTags.Registros != null)
                              this.load = false;
                            else
                              this.load = false;


                          },
                          err => {
                              console.log(err);
                              this.load = false;
                          });
                          //console.log(this.resultadoConsulta);
  }

  getPesquisa(pg, querystring){
    this.apiUnes.ListaBuscaVideos(pg, querystring)
                      .subscribe(
                          retorno => {
                            //this.loginService.Validate(retorno.Token);
                            if(retorno.Registros == null)
                            {
                              this.VideosBusca = new Retorno(Object[0],0,0,0, false);
                              this.resultadoConsulta = true;
                            }
                            else if(retorno.Registros.length == 0)
                              this.resultadoConsulta = true;
                            else
                              this.resultadoConsulta = false;

                            this.VideosBusca = retorno;
                            if(this.VideosBusca.Registros != null)
                              this.load = false;
                            else
                              this.load = false;


                          },
                          err => {
                              console.log(err);
                              this.load = false;
                          });
                          //console.log(this.resultadoConsulta);
  }

  doInfinite(infiniteScroll) {
    //console.log('Begin async operation');

    setTimeout(() => {

      if(this.tabs === 'todos')
      {
        if(this.Videos.TotalDeRegistros > this.Videos.ItensPorPagina)
        {
          this.pgTodos++;
          let pg: number = this.pgTodos;
          this.apiUnes.ListaVideos(pg)
                            .subscribe(
                                retorno => {
                                  if(this.Videos.Registros != null){
                                    for (var i = 0; i < retorno.Registros.length; i++) {
                                      this.Videos.Registros.push(retorno.Registros[i]);
                                    }
                                    infiniteScroll.complete();
                                  }
                                  else
                                  {
                                    this.Videos.Registros = retorno.Registros;
                                    infiniteScroll.complete();
                                  }
                                },
                                err => {
                                    console.log(err);
                                });
        }
        else
          infiniteScroll.complete();
      }
      else if(this.tabs === 'maisVistos')
      {
        if(this.VideosMaisVistos.TotalDeRegistros > this.VideosMaisVistos.ItensPorPagina)
        {
          this.pgTodos++;
            let pg: number = this.pgTodos;
            this.apiUnes.ListaVideosMaisVistos(pg)
                              .subscribe(
                                  retorno => {
                                    if(this.VideosMaisVistos.Registros != null){
                                      for (var i = 0; i < retorno.Registros.length; i++) {
                                        this.VideosMaisVistos.Registros.push(retorno.Registros[i]);
                                      }
                                      infiniteScroll.complete();
                                    }
                                    else
                                    {
                                      this.VideosMaisVistos.Registros = retorno.Registros;
                                      infiniteScroll.complete();
                                    }
                                  },
                                  err => {
                                    //infiniteScroll.complete();
                                      console.log(err);
                                  });
        }
        else
          infiniteScroll.complete();
      }
      else if(this.tabs === 'maisRecentes')
      {
        if(this.VideosMaisRecentes.TotalDeRegistros > this.VideosMaisRecentes.ItensPorPagina)
        {
          this.pgTodos++;
          let pg: number = this.pgTodos;
          this.apiUnes.ListaVideosMaisRecentes(pg)
                            .subscribe(
                                retorno => {
                                  if(this.VideosMaisRecentes.Registros != null){
                                    for (var i = 0; i < retorno.Registros.length; i++) {
                                      this.VideosMaisRecentes.Registros.push(retorno.Registros[i]);
                                    }
                                    infiniteScroll.complete();
                                  }
                                  else
                                  {
                                    this.VideosMaisRecentes.Registros = retorno.Registros;
                                    infiniteScroll.complete();
                                  }
                                },
                                err => {
                                    console.log(err);
                                    //infiniteScroll.complete();
                                });
        }
        else
          infiniteScroll.complete();
      }


      //console.log('Async operation has ended');
      //infiniteScroll.complete();
    }, 500);
  }

  itemTapped(event, tag) {
    this.navCtrl.push(TagVideo, {
      id: { UntIdTag: tag.UNT_ID_TAG, UntTxNome: tag.UNT_TX_NOME },
      dados: this.dadosLogin
    });
  }

}
