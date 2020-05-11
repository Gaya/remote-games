import { LocalStorageKeys } from './types';

export function storeNickname(nickname: string): void {
  window.localStorage.setItem(LocalStorageKeys.nickname, nickname);
}

export function getStoredNickname(): string | null {
  return window.localStorage.getItem(LocalStorageKeys.nickname);
}

export function getStoredAutoConnect(): boolean {
  return Boolean(window.localStorage.getItem(LocalStorageKeys.autoConnect));
}
