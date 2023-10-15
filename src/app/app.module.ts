import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
    DatePipe,

    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
