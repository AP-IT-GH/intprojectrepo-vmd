import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private http: HttpClient) { }

  get deviceinfo() {
    return this.http.get("http://35.210.149.21:3000/device");
  }
}

export interface IDevice {
	ID: number;
	Password: string;
	Name: string;
}



