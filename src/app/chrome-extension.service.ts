import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Dictionary, Tab } from './tab.interface';

function getLocalStorage() {
  return JSON.stringify(localStorage);
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
  tabId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChromeExtensionService {
  init(): void {
    chrome.runtime.connect({ name: 'popup' });
  }

  getTabs(): Observable<Tab[]> {
    return new Observable((observer) => {
      chrome.tabs.query({}, (tabs) => observer.next(tabs));
    }).pipe(
      map((e) => {
        let tabs: Tab[] = [];
        console.log(e);

        if (Array.isArray(e)) {
          tabs = e
            .map((item) => {
              return {
                name: item.title,
                id: item.id,
                url: item?.url,
              };
            });
        }

        return tabs;
      })
    );
  }

  getTabLocalStorage(tabId: number): Observable<Dictionary> {
    return new Observable((observer) => {
      chrome.scripting.executeScript(
        {
          target: { tabId },
          func: getLocalStorage,
        },
        (injectionResults) => {
          const results: Dictionary = JSON.parse(injectionResults[0].result);
          observer.next(results);
        }
      );
    });
  }

  setTabLocalStorage(tabId: number, storage: Dictionary) {
    chrome.scripting.executeScript({
      target: { tabId },
      func: overrideLocalStorage,
      args: [JSON.stringify(storage)],
    });
  }
}
