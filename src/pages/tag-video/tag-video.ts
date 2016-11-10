import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Response } from '@angular/http';

import { LoadingController } from 'ionic-angular';

import { ApiUnes } from '../../providers/api-unes';

import { Retorno } from '../../models/retorno';

import { ViewVideo} from '../view-video/view-video';

@Component({
  selector: 'page-tag-video',
  templateUrl: 'tag-video.html',
  providers:[ApiUnes]
})
export class TagVideo {

  protocol: string = '';
  tabs: string = "tag";
  resultadoConsulta: Boolean = false;
  load: Boolean = false;
  pgTodos: number = 1;
  pgMaisVistos: number = 1;
  pgMaisRecentes: number = 1;

  Titulo: string = '';
  IdTag: number = 0;
  Tags: Retorno = new Retorno(Object[0],0,0,0, false);
  Perfis: Retorno = new Retorno(Object[0],0,0,0, false);
  Videos: Retorno = new Retorno(Object[0],0,0,0, false);
  VideosMaisVistos: Retorno = new Retorno(Object[0],0,0,0, false);
  VideosMaisRecentes: Retorno = new Retorno(Object[0],0,0,0, false);
  VideosTags: Retorno = new Retorno(Object[0],0,0,0, false);
  VideosBusca: Retorno = new Retorno(Object[0],0,0,0, false);
  dadosLogin: Retorno = new Retorno(Object[0],0,0,0, false);
  param: any;


  constructor(public loadingCtrl: LoadingController, private apiUnes: ApiUnes, public navCtrl: NavController, public navParams: NavParams) {
    this.dadosLogin = navParams.get('dados');
    this.protocol = 'https:';
    this.param = this.navParams.get('id');
    this.Titulo = this.param.UntTxNome;
    this.IdTag =  this.param.UntIdTag;
    this.presentLoading();
    this.getTagsMenu();
    this.getPerfis();
    this.getVideos(this.pgTodos, this.IdTag);

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

  goBack() {
    this.navCtrl.pop();
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

  getVideos(pg, tag){
    this.apiUnes.ListaVideosTags(pg, tag)
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

      if(this.tabs === 'tag')
      {
          if(this.Videos.TotalDeRegistros > this.Videos.ItensPorPagina)
          {
            this.pgTodos++;
            let pg: number = this.pgTodos;
            this.apiUnes.ListaVideosTags(pg, this.IdTag)
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


      //console.log('Async operation has ended');
      //infiniteScroll.complete();
    }, 500);
  }



}
