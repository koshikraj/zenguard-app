import { AppStoreImpl} from '../index';
import { IStore } from '../store';
import { action, makeObservable, observable } from 'mobx';

export enum StoreType {
  ACCOUNT = 'accountStore',
  APP = 'appStore',
  SAFE = 'safeStore'
}

export interface Stores extends IStore {
  /**
   * Contains safe specific details
   */

  /**
   * contains app related details
   */
  appStore: AppStoreImpl;

  /**
   * Contains account specific details such as jwt, profile etc.
   */
}

export class StoresImpl implements Stores {
  appStore: AppStoreImpl;

  constructor() {
    this.appStore = new AppStoreImpl();

    makeObservable<StoresImpl, any>(this, {
      accountStore: observable,
      appStore: observable,
      safeStore: observable,
      resetStore: action,
    });
  }

  resetStore = (): void => {
    // All the stores must be reset here
    this.appStore.resetStore();
  };
}

export const stores: Stores = new StoresImpl();
