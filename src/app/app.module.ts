// @ts-ignore
import { BrowserModule } from '@angular/platform-browser';
// @ts-ignore
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
// @ts-ignore
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// @ts-ignore
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {HidrogelPageComponent} from './shared/hidrogel-page/hidrogel-page.component';
// @ts-ignore
import {FlexLayoutModule} from '@angular/flex-layout';


// @ts-ignore
import localeEs from '@angular/common/locales/es-AR';
// @ts-ignore
import { registerLocaleData } from '@angular/common';
import {TokenInterceptorService} from './services/token-interceptor.service';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from './material/material.module';

registerLocaleData( localeEs );



// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HidrogelPageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-AR' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
