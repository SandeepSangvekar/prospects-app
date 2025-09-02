import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'; // For AES encryption and decryption
import { openDB, IDBPDatabase } from 'idb'; // For IndexedDB
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private dbPromise: Promise<IDBPDatabase>;
  private readonly SECRET_KEY = environment.indexedDB.encryptionKey;

  constructor() {
    // Initialize IndexedDB
    this.dbPromise = openDB(environment.indexedDB.dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(environment.indexedDB.storeName)) {
          db.createObjectStore(environment.indexedDB.storeName, { keyPath: 'key' });
        }
      },
    });
  }

  /**
   * Encrypts data using AES encryption.
   * @param data - The data to be encrypted.
   * @returns The encrypted string.
   */
  encrypt(data: any): string {
    const stringData = JSON.stringify(data);
    return CryptoJS.AES.encrypt(stringData, this.SECRET_KEY).toString();
  }

  /**
   * Decrypts encrypted data.
   * @param encryptedData - The AES encrypted string.
   * @returns The decrypted object.
   */
  decrypt(encryptedData: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  /**
   * Saves encrypted data to IndexedDB.
   * @param key - The key under which data is stored.
   * @param data - The data to store (will be encrypted).
   */
  async saveToIndexedDB(key: string, data: any): Promise<void> {
    const encryptedData = this.encrypt(data);
    const db = await this.dbPromise;
    await db.put(environment.indexedDB.storeName, { key, value: encryptedData });
  }

  /**
   * Retrieves and decrypts data from IndexedDB.
   * @param key - The key under which data is stored.
   * @returns The decrypted data.
   */
  async getFromIndexedDB(key: string): Promise<any> {
    const db = await this.dbPromise;
    const record = await db.get(environment.indexedDB.storeName, key);
    if (record && record.value) {
      return this.decrypt(record.value);
    }
    return null;
  }

  /**
   * Removes data from IndexedDB.
   * @param key - The key under which data is stored.
   */
  async removeFromIndexedDB(key: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete(environment.indexedDB.storeName, key);
  }
}
