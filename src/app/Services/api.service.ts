import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private http: HttpClient) { }

  deviceinfogeneral() {
    return this.http.get(`http://35.210.149.21:3000/device`);
  }

   devicedata() {
    return this.http.get(`http://35.210.149.21:3000/data`);
  }

    deviceinfo(Id) {
    return this.http.get(`http://35.210.149.21:3000/device/${Id}`);
  }
}
/*
export interface IDataList {
  array: [];
}
*/
export interface DeviceData {
  ID: number;
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



