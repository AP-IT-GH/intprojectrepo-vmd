import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Time } from '@angular/common';

const ENTRY_KEY = 'Temp-entries';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) { }
  //* Create/add entry
  addEntry(entry: IexeedEntry): Promise<any> {
    return this.storage.get(ENTRY_KEY).then((entries: IexeedEntry[]) => {
      if (entries) {
        entries.push(entry);
        return this.storage.set(ENTRY_KEY, entries);
      }
      else {
        return this.storage.set(ENTRY_KEY, [entry]);
      }
    })
  }

  //* get entries
  getEntries(): Promise<IexeedEntry[]> {
    return this.storage.get(ENTRY_KEY);
  }

  //* Delete entries
  deleteEntry(id: number): Promise<IexeedEntry> {
    return this.storage.get(ENTRY_KEY).then((entries: IexeedEntry[]) => {
      if (!entries || entries.length === 0) {
        return null;
      }

      let tokeep: IexeedEntry[] = [];

      for (let i of entries) {
        if (i.id !== id) {
          tokeep.concat(i);
        }
      }

      return this.storage.set(ENTRY_KEY, tokeep);
    })
  }

  deleteAllEntries(): Promise<void> {
    return this.storage.clear();
  }
}

export interface IexeedEntry {
  id: number,
  temperature: number,
  humidity: number,
  date: Date,
  time: Time,
  rangeCount: number
}
