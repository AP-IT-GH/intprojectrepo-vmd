import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private http: HttpClient) { }

  get deviceinfogeneral() {
    return this.http.get(`http://35.210.149.21:3000/device`);
  }

  get devicedata() {
    return this.http.get(`http://35.210.149.21:3000/data`);
  }

    deviceinfo(Id) {
    return this.http.get(`http://35.210.149.21:3000/device/${Id}`);
  }
}

export interface DeviceData {
	DeviceID: number;
	Temperature: number;
  Humidity: number;
  Moisture: number;
  Time: Date;
  Date: Date;
  Battery: Number;
}

export interface IDevice {
	ID: number;
	Password: string;
	Name: string;
}



