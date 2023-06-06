import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChromeExtensionService } from './chrome-extension.service';
import { Dictionary, PairKeyValue, Tab } from './tab.interface';

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
  sourceTabStorage: PairKeyValue[] = [];
  targetTabStorage: Dictionary = {};

  constructor(
    private readonly ceService: ChromeExtensionService,
    private readonly cdr: ChangeDetectorRef,
  ){}

  ngOnInit() {
    this.ceService.init();
    this.ceService.getTabs().subscribe((e) => {
      this.tabs = e;
      this.cdr.detectChanges();
    });
  }

  setSourceTab(tabIndex: string) {
    this.sourceTab = this.tabs[+tabIndex];
    this.getTabStorage();
  }

  setTargetTab(tabIndex: string) {
    this.targetTab = this.tabs[+tabIndex];
    this.cdr.detectChanges();
  }

  getTabStorage() {
    this.sourceTabStorage = [];
    this.targetTabStorage = {};
    if (!this.sourceTab) return;
    this.ceService.getTabLocalStorage(this.sourceTab.id).subscribe((tabStorage) => {

      for (let key in tabStorage) {
        if (tabStorage.hasOwnProperty(key)) {
            this.sourceTabStorage.push(
              {
                key,
                value: tabStorage[key],
              }
            );
        }
      }
      this.cdr.detectChanges();
    });
  }

  setTargetStorage(item:PairKeyValue) {
    if (this.targetTabStorage[item.key])
      delete this.targetTabStorage[item.key];
    else this.targetTabStorage[item.key] = item.value;
  }

  sync() {
    if (!this.targetTab) return;
    this.ceService.setTabLocalStorage(this.targetTab.id, this.targetTabStorage);
  }
}
