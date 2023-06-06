import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SubstringPipe } from './substring.pipe';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SubstringPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
