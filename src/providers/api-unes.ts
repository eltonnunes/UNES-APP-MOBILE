import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import '../globals';

import { Retorno }          from '../models/retorno';
import { GlobalVariable }   from '../globals'

@Injectable()
export class ApiUnes {

  // URL to web API
  private API_URL_TAGS: string =  GlobalVariable.BASE_API_URL + 'TbUniversidadeTag/';
  private API_URL_PERFIS: string =  GlobalVariable.BASE_API_URL + 'TbUniversidadePerfil/';
  private API_URL_VIDEOS: string =  GlobalVariable.BASE_API_URL + 'TbUniversidadeVideos/';

  constructor(private http: Http) { }


  public ListaTagsMenu(dados){
    // console.log(dados)
    let urlapi: string =  this.API_URL_TAGS + dados.Registros[0].UTA_TX_TOKEN
                                            + '/1/100/0/0/1'; //Valores fixos para /Coleção/CampoOrdenação/Ordenação/ItensPorPagina/PaginaAtual
    return this.http.get(urlapi)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public ListaPerfis(dados){
    let urlapi: string =  this.API_URL_PERFIS + dados.Registros[0].UTA_TX_TOKEN
                                            + '/1/100/0/0/1'; //Valores fixos para /Coleção/CampoOrdenação/Ordenação/ItensPorPagina/PaginaAtual
    return this.http.get(urlapi)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public ListaVideos(pg, dados){
    let urlapi: string =  this.API_URL_VIDEOS + dados.Registros[0].UTA_TX_TOKEN
                                              + '/1/100/1/6/' + pg;
    return this.http.get(urlapi)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public ListaVideosMaisVistos(pg, dados){
    let urlapi: string =  this.API_URL_VIDEOS + dados.Registros[0].UTA_TX_TOKEN
                                              + '/0/103/1/6/' + pg;
    return this.http.get(urlapi)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public ListaVideosMaisRecentes(pg, dados){
    let urlapi: string =  this.API_URL_VIDEOS + dados.Registros[0].UTA_TX_TOKEN
                                              + '/1/105/1/6/' + pg;
    return this.http.get(urlapi)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public ListaVideosTags(pg, querystring, dados){
    let urlapi: string =  this.API_URL_VIDEOS + dados.Registros[0].UTA_TX_TOKEN
                                              + '/0/105/1/6/' + pg + '/?106=' + querystring;
    return this.http.get(urlapi)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public ListaBuscaVideos(pg, search, dados){
    let queryString = '?102=' + search + '%&101=' + search + '%';
    let urlapi: string =  this.API_URL_VIDEOS + dados.Registros[0].UTA_TX_TOKEN
                                              + '/0/105/1/6/' + pg + '/' + queryString;
    return this.http.get(urlapi)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  public ListaAdmin(dados){
    let URL:string  = GlobalVariable.BASE_API_URL + 'TbUniversidadeTokenApi/';
    let urlapi: string =  URL + dados.Registros[0].UTA_TX_TOKEN
                                              + '/3/100/0/0/1';
    return this.http.get(urlapi)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public AtualizaViewVideo(body: any, dados): Observable<Response> {
        let urlapi: string =  this.API_URL_VIDEOS + dados.Registros[0].UTA_TX_TOKEN;
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(urlapi, bodyString, options)
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public AtualizaVideo(body: any, dados): Observable<Response> {
        let urlapi: string =  this.API_URL_VIDEOS + dados.Registros[0].UTA_TX_TOKEN + '/alterar';
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(urlapi, bodyString, options)
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  public RemoverVideo(id: any, dados): Observable<Response> {
        let urlapi: string =  this.API_URL_VIDEOS + dados.Registros[0].UTA_TX_TOKEN + '/' + id;
        return this.http.delete(urlapi)
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  public YoutubeBuscarDadosVideo(HASH: any): Observable<Response> {
        let urlYoutubeApi = 'https://www.googleapis.com/youtube/v3/videos?id=' + HASH + '&key=AIzaSyCZrRSmvH3-gDN0YC9PYHLP--FR9OaaYkI&fields=items(id,snippet(channelId,title,description,categoryId),statistics)&part=snippet';
        return this.http.get(urlYoutubeApi)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }



  public CadastrarVideo(body: any, dados): Observable<number> {
    let urlapi: string =  this.API_URL_VIDEOS + dados.Registros[0].UTA_TX_TOKEN;
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(urlapi, bodyString, options)
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   }

}
