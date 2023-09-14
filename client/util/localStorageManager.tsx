export class LocalStorageManager {
    private key;
    constructor(key: string) {
      this.key = key;
    }
  
    get() {
      const data = localStorage.getItem(this.key);
      return data && JSON.parse(data);
    }
    save<T>(data: T) {
      localStorage.setItem(this.key, JSON.stringify(data));
    }
  
    delete() {
      localStorage.removeItem(this.key);
    }
  }
  