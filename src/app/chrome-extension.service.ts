import { Injectable, OnDestroy } from '@angular/core';
import {
  Observable, map,
} from 'rxjs';
import { Dictionary, Tab } from './tab.interface';

function getLocalStorage(){
  return  JSON.stringify(localStorage);
}

function overrideLocalStorage(storage: string) {
  const decodedStorage = JSON.parse(storage) as Dictionary;
  for (let key in decodedStorage) {
    if (decodedStorage.hasOwnProperty(key)) {
      console.log('Key:', key);
      console.log('Value:', decodedStorage[key]);
      localStorage.setItem(key, decodedStorage[key]);
    }
  }
}

export interface ITabID {
  tabId: number
}

@Injectable({
  providedIn: 'root',
})
export class ChromeExtensionService implements OnDestroy {
  private tabId!: ITabID;

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

  getTabLocalStorage(tabId: number): Observable<Dictionary>{
    return new Observable((observer) => {
      this.tabId = { tabId };
      
      chrome.scripting.executeScript({
          target: this.tabId, 
          func: getLocalStorage,
        },
        (injectionResults) => {
            const results: Dictionary = JSON.parse(injectionResults[0].result);
            observer.next(results);
        });
    });
  }

  // setTokens(storage: Dictionary) {
  //   this.getOlimpoDevLocalStorage('drago').subscribe((id) => {
  //     this.tabId = { tabId: id };

  //     chrome.scripting.executeScript({
  //       target: this.tabId, // you can get the Tab id using chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {});
  //           func: overrideLocalStorage,
  //           args: [JSON.stringify(storage)],
  //       });
  //   });
  // }
}
