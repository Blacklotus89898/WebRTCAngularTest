// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PeerConnectionComponent } from './components/peer-connection/peer-connection.component';
@NgModule({
  declarations: [
    AppComponent,
    PeerConnectionComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
