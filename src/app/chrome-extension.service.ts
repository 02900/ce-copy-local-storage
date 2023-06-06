import { Injectable, OnDestroy } from '@angular/core';
import {
  Observable, map,
} from 'rxjs';
import { Tab } from './tab.interface';

function getLocalStorage(){
  return  JSON.stringify(localStorage);
}

function setValue(token: string) {
  localStorage.setItem('olimpo_v2_userCognito', token);
}

export interface ITabID {
  tabId: number
}

@Injectable({
  providedIn: 'root',
})
export class ChromeExtensionService implements OnDestroy {
  private tabId!: ITabID;
  private lastCognitoToken :string = '';

  ngOnDestroy(): void {
    this.detach();
  }

  detach() {
    chrome.debugger.detach(this.tabId);
  }

  init(): void {
    chrome.runtime.connect({ name: 'popup' });
  }

  public getTabs(): Observable<Tab[]> {
    return new Observable((observer) => {
      chrome.tabs.query({ }, (tabs) => observer.next(tabs));
    }).pipe(map((e) => {
      let tabs: Tab[] = [];
      
      if (Array.isArray(e)) {
        tabs = e.filter((item) => item?.title && item?.url)
        .map((item) => {
          return {
            name: item.title,
            id: item.id, 
            url: item?.url
          }
        })
      }

      return tabs;
    }));
  }

  getToken(): Observable<any>{
    return new Observable((observer) => {
      this.getOlimpoDevLocalStorage('olimpo').subscribe((id) => {
        this.tabId = { tabId: id };
        console.log(id);
  
        chrome.scripting.executeScript({
          target: this.tabId, // you can get the Tab id using chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {});
              func: getLocalStorage,
          },
          (injectionResults) => {
              const results: any = JSON.parse(injectionResults[0].result);
              this.lastCognitoToken = results['olimpo_v2_userCognito'];
              observer.next(results);
          });
      });
    })
  }

  setToken() {
    this.getOlimpoDevLocalStorage('drago').subscribe((id) => {
      this.tabId = { tabId: id };

      alert(id + "AA");

      chrome.scripting.executeScript({
        target: this.tabId, // you can get the Tab id using chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {});
            func: setValue,
            args: [this.lastCognitoToken],
        });
    });
  }

  private getOlimpoDevLocalStorage(target: string): Observable<number> {
    return new Observable((observer) => {
      const urlOlimpo = 'https://www.olimpo-web.dev.kavak.services/mx/*';
      const urlDrago = 'https://my-future-car-ui.dev.kavak.io/mx/*';
      const urlLocal = 'http://localhost:4200/*';
      const url = target === 'olimpo' ? urlOlimpo : urlLocal;
      chrome.tabs.query({ url }, (tabs) => observer.next(tabs[0].id));
    });
  }


}
