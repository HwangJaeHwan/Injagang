export class SessionStorageManager {
  private key;
  constructor(key: string) {
    this.key = key;
  }

  get() {
    const data = sessionStorage.getItem(this.key);
    return data && JSON.parse(data);
  }
  save<T>(data: T) {
    sessionStorage.setItem(this.key, JSON.stringify(data));
  }

  delete() {
    sessionStorage.removeItem(this.key);
  }
}
