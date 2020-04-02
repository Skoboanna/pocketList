import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SimplebarAngularModule } from 'simplebar-angular';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ListElementComponent } from './list-element/list-element.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BackdropComponent } from './backdrop/backdrop.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListElementComponent,
    BackdropComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    SimplebarAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
