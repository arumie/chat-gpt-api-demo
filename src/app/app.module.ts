import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShakespeareQuoteGeneratorComponent } from './shakespeare-quote-generator/shakespeare-quote-generator.component';
import { ShakespeareQuoteService } from './shakespeare-quote-generator/shakespeare-quote.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShakespeareQuoteGeneratorComponent,
    BrowserAnimationsModule
  ],
  providers: [ShakespeareQuoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
