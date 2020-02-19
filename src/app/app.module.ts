import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImagemodalPage } from './imagemodal/imagemodal.page';
import { ImagemodalPageModule } from './imagemodal/imagemodal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotpasswordmodalPageModule } from './forgotpasswordmodal/forgotpasswordmodal.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [AppComponent],
  entryComponents: [ImagemodalPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ImagemodalPageModule,
    ReactiveFormsModule,
    ForgotpasswordmodalPageModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
