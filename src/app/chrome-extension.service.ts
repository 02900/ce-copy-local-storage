import { Injectable, OnDestroy } from '@angular/core';
import {
  Observable,
} from 'rxjs';

function getLocalStorage(){
  return  JSON.stringify(localStorage);
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

    const DEBUGGING_PROTOCOL_VERSION = '1.0';
    this.currentTab().subscribe((id) => {
      this.tabId = { tabId: id };
      chrome.debugger.attach(this.tabId, DEBUGGING_PROTOCOL_VERSION);

      chrome.scripting.executeScript({
        target: this.tabId, // you can get the Tab id using chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {});
            func: getLocalStorage,
        },
        (injectionResults) => {
            console.log('storage response: ', injectionResults[0].result); 
        });
    });
  }

  private currentTab(): Observable<number> {
    return new Observable((observer) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => observer.next(tabs[0].id));
    });
  }
}
