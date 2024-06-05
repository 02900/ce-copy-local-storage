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
          tabs = e.map((item) => {
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

  // Method to get cookies for a specific tab
  getCookies(tab: Tab): Promise<chrome.cookies.Cookie[]> {
    return new Promise((resolve, reject) => {
      chrome.cookies.getAll({ url: tab.url }, (cookies) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(cookies);
        }
      });
    });
  }

  // Method to set cookies for a specific tab
  setCookies(url: string, cookies: chrome.cookies.Cookie[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const domain = new URL(url).hostname;
      cookies.forEach((cookie) => {
        const {
          name,
          value,
          path,
          secure,
          httpOnly,
          expirationDate,
          sameSite,
        } = cookie;
        chrome.cookies.set(
          {
            url,
            name,
            value,
            domain,
            path,
            secure,
            httpOnly,
            expirationDate,
            sameSite,
          },
          () => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            }
          }
        );
      });
      resolve();
    });
  }

  async transferCookies(
    sourceTab: Tab | undefined,
    targetUrl: string
  ): Promise<void> {
    if (!sourceTab) return;
    const sourceCookies = await this.getCookies(sourceTab);
    await this.setCookies(targetUrl, sourceCookies);
  }

  async getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
}
