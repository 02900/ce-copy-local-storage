import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChromeExtensionService } from './chrome-extension.service';
import { Dictionary, PairKeyValue, Tab } from './tab.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ce-share-local-storage';
  tabs: Tab[] = [];
  sourceTab: Tab | undefined;
  targetTab: Tab | undefined;
  sourceTabStorage: PairKeyValue[] = [];
  targetTabStorage: Dictionary = {};
  sourceTabCookies: chrome.cookies.Cookie[] = [];
  targetCookies: chrome.cookies.Cookie[] = [];

  constructor(
    private readonly ceService: ChromeExtensionService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.ceService.init();
    this.ceService.getTabs().subscribe((e) => {
      this.tabs = e;
      this.cdr.detectChanges();
    });
  }

  setSourceTab(index: number) {
    this.sourceTab = this.tabs[index];
    this.loadSourceTabCookies();
  }

  setTargetTab(index: number) {
    this.targetTab = this.tabs[index];
    this.cdr.detectChanges();
  }

  getTabStorage() {
    this.sourceTabStorage = [];
    this.targetTabStorage = {};
    if (!this.sourceTab) return;
    this.ceService
      .getTabLocalStorage(this.sourceTab.id)
      .subscribe((tabStorage) => {
        for (let key in tabStorage) {
          if (tabStorage.hasOwnProperty(key)) {
            this.sourceTabStorage.push({
              key,
              value: tabStorage[key],
            });
          }
        }
        this.cdr.detectChanges();
      });
  }

  setTargetStorage(item: PairKeyValue) {
    if (this.targetTabStorage[item.key]) delete this.targetTabStorage[item.key];
    else this.targetTabStorage[item.key] = item.value;
  }

  async loadSourceTabCookies() {
    if (this.sourceTab) {
      this.sourceTabCookies = await this.ceService.getCookies(this.sourceTab);
    }
  }

  setTargetCookie(cookie: chrome.cookies.Cookie) {
    const index = this.targetCookies.findIndex((c) => c.name === cookie.name);
    if (index !== -1) {
      this.targetCookies.splice(index, 1);
    } else {
      this.targetCookies.push(cookie);
    }
  }

  async sync() {
    if (this.sourceTab && this.targetTab) {
      this.ceService.setTabLocalStorage(
        this.targetTab.id,
        this.targetTabStorage
      );      await this.ceService.setCookies(
        this.targetTab,
        this.targetCookies
      );
    }
  }
}
