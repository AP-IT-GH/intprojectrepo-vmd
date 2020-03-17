import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class APIService {
  constructor(private http: HttpClient) { }

  GetDeviceInfogeneral() {
    return this.http.get<IDevice[]>(`http://35.210.149.21:3000/device`);
  }

  GetDevicedata() {
    return this.http.get<IDeviceData[]>(`http://35.210.149.21:3000/data`);
  }

  GetDeviceinfo(Id) {
    return this.http.get<IDevice[]>(`http://35.210.149.21:3000/device/${Id}`);
  }
}

export interface IDeviceData {
  ID: number;
	Device_ID: number;
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



