import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { LoginLayoutComponent } from '../layouts/login-layout/login-layout.component';
import { MasterLayoutComponent } from '../layouts/master-layout/master-layout.component';
import { BlankLayoutComponent } from '../layouts/blank-layout/blank-layout.component';

import { FullComponent } from './components/full/full.component';
import { GuestComponent } from './components/guest/guest.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HeaderNavigationComponent } from './components/header-navigation/header-navigation.component';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { HeaderCommentComponent } from './components/header-comment/header-comment.component';
import { HeaderMessagesComponent } from './components/header-messages/header-messages.component';
import { HeaderProfileComponent } from './components/header-profile/header-profile.component';

//import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
//import { InMemoryDatabase } from "../in-memory-database";

@NgModule({
  declarations: [
    LoginLayoutComponent,
    MasterLayoutComponent,
    BlankLayoutComponent,

    FullComponent,
    GuestComponent,
    SpinnerComponent,
    HeaderNavigationComponent,
    HeaderSearchComponent,
    HeaderCommentComponent,
    HeaderMessagesComponent,
    HeaderProfileComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    RouterModule
  ],
  exports:[
    // shared modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // shared components
    LoginLayoutComponent,
    MasterLayoutComponent,
    BlankLayoutComponent,

    FullComponent,
    GuestComponent,
    SpinnerComponent,
    HeaderNavigationComponent,
    HeaderSearchComponent,
    HeaderCommentComponent,
    HeaderMessagesComponent,
    HeaderProfileComponent,
  ]
})
export class CoreModule { }
