import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { ViewVideo } from '../pages/view-video/view-video';
import { TagVideo } from '../pages/tag-video/tag-video';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';

import { ApiUnes } from '../providers/api-unes';
import { LoginService } from '../providers/login-service';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    ViewVideo,
    TagVideo,
    Login,
    Home
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    ViewVideo,
    TagVideo,
    Login,
    Home
  ],
  providers: [
    ApiUnes,
    LoginService
  ]
})
export class AppModule {}
