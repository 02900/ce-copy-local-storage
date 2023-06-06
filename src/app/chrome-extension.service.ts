import { Injectable, OnDestroy } from '@angular/core';
import {
  Observable,
} from 'rxjs';

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

  getToken(): Observable<any>{
    return new Observable((observer) => {
      this.GetOlimpoDevLocalStorage('olimpo').subscribe((id) => {
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
    this.GetOlimpoDevLocalStorage('drago').subscribe((id) => {
      this.tabId = { tabId: id };

      alert(id + "AA");

      chrome.scripting.executeScript({
        target: this.tabId, // you can get the Tab id using chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {});
            func: setValue,
            args: [this.lastCognitoToken],
        });
    });
  }

  private GetOlimpoDevLocalStorage(target: string): Observable<number> {
    return new Observable((observer) => {
      const urlOlimpo = 'https://www.olimpo-web.dev.kavak.services/mx/*';
      const urlDrago = 'https://my-future-car-ui.dev.kavak.io/mx/*';
      const urlLocal = 'http://localhost:4200/*';
      const url = target === 'olimpo' ? urlOlimpo : urlLocal;
      chrome.tabs.query({ url }, (tabs) => observer.next(tabs[0].id));
    });
  }
}
