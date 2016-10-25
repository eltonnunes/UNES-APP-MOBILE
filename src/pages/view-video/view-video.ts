import { Component } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { NavController, NavParams } from 'ionic-angular';

import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { YoutubeService } from '../../providers/youtube-service';

import { LoadingController } from 'ionic-angular';

/*
  Generated class for the ViewVideo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-video',
  templateUrl: 'view-video.html',
  providers:[YoutubeService]
})
export class ViewVideo {

  selectedItem: any;

  channelID: string = 'UCbtVfS6cflbIXTZ0nGeRWVA';
  maxResults: string = '6';
  pageToken: string;
  googleToken: string = 'AIzaSyCZrRSmvH3-gDN0YC9PYHLP--FR9OaaYkI';
  searchQuery: string = 'ravetraintv -kissing';
  posts: any = [];
  onPlaying: boolean = true;
  url:SafeUrl;

  constructor(public loadingCtrl: LoadingController, public http: Http,public navCtrl: NavController, public navParams: NavParams, public ytPlayer: YoutubeService, private sanitizer: DomSanitizer) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.presentLoading();
  }


  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: "Ops! Aguarde...",
      duration: 3000,
      dismissOnPageChange: true
    });
    loading.present();
  }

  ionViewDidLoad() {
    console.log('Hello ViewVideo Page');
    this.launchYTPlayer(this.selectedItem.UNV_TX_HASH, this.selectedItem.UNV_TX_TITULO);
  }

  goBack() {
    this.navCtrl.pop();
  }


    launchYTPlayer(id, title): void {
      let URL = 'http://www.youtube.com/embed/' + id +  '?rel=0&amp;autoplay=1';
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(URL);
      //this.ytPlayer.launchPlayer(id, title);
    }

    fetchData(): void {

      let url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=' + this.channelID + '&q=' + this.searchQuery + '&type=video&order=viewCount&maxResults=' + this.maxResults + '&key=' + this.googleToken;

      if(this.pageToken) {
        url += '&pageToken=' + this.pageToken;
      }

      this.http.get(url).map(res => res.json()).subscribe(data => {

        //console.log (data.items);
        // *** Get individual video data like comments, likes and viewCount. Enable this if you want it.
        // let newArray = data.items.map((entry) => {
        //   let videoUrl = 'https://www.googleapis.com/youtube/v3/videos?part=id,snippet,contentDetails,statistics&id=' + entry.id.videoId + '&key=' + this.googleToken;
        //   this.http.get(videoUrl).map(videoRes => videoRes.json()).subscribe(videoData => {
        //     console.log (videoData);
        //     this.posts = this.posts.concat(videoData.items);
        //     return entry.extra = videoData.items;
        //   });
        // });
        this.posts = this.posts.concat(data.items);
      });
    }
    loadSettings(): void {
        this.fetchData();
    }
    openSettings(): void {
        console.log("TODO: Implement openSettings()");
    }
    /*playVideo(e, post): void {
        console.log(post);
        this.onPlaying = true;
        this.ytPlayer.launchPlayer(post.id, post.snippet.title);
    }*/
    loadMore(): void {
        console.log("TODO: Implement loadMore()");
    }

}
