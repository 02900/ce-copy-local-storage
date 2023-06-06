import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChromeExtensionService } from './chrome-extension.service';
import { Tab } from './tab.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ce-share-local-storage';
  tabs: Tab[] = [];
  sourceTab: Tab | undefined;
  targetTab: Tab | undefined;

  constructor(private readonly ceService: ChromeExtensionService,
    private readonly cdr: ChangeDetectorRef){}

  ngOnInit() {
    this.ceService.init();
    this.ceService.getTabs().subscribe((e) => {
      this.tabs = e;
      this.cdr.detectChanges();
    });
  }

  setSourceTab(tabIndex: string) {
    this.sourceTab = this.tabs[+tabIndex];
    this.cdr.detectChanges();
  }

  setTargetTab(tabIndex: string) {
    this.targetTab = this.tabs[+tabIndex];
    this.cdr.detectChanges();
  }

  sync() {
    this.ceService.getToken().subscribe((tokens) => {
      console.log(tokens["olimpo_v2_userCognito"]);
    });

    this.ceService.setToken();
  }
}
