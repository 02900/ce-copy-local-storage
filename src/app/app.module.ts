import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SubstringPipe } from './substring.pipe';
import { UrlBasePipe } from './url-base.pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SubstringPipe, UrlBasePipe],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
