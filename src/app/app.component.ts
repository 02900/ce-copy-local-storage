import { Component, OnInit } from '@angular/core';
import { ChromeExtensionService } from './chrome-extension.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ce-share-local-storage';

  constructor(private readonly ceService: ChromeExtensionService){}

  ngOnInit() {
    this.ceService.init();
  }
}
