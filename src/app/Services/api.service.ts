import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DatePipe, formatDate } from '@angular/common';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class APIService {
  constructor(private http: HttpClient) { }

  GetDeviceInfogeneral() {
    return this.http.get<IDevice[]>(`http://35.210.149.21:3000/device`);
  }

  GetDeviceDataAll() {
    return this.http.get<IDeviceData[]>(`http://35.210.149.21:3000/data`);
  }
  GetDeviceDataSingle(Id){
    return this.http.get<IDeviceData[]>(`http://35.210.149.21:3000/data/${Id}`)
    .pipe(
      map((data)=>{
        for(let entry of data){
          entry.Date = new Date(entry.Date);
        }
        return data;
      })
    );
  }
  
  GetDeviceinfo(Id) {
    return this.http.get<IDevice[]>(`http://35.210.149.21:3000/device/${Id}`);
  }

  GetLatestSingleDeviceInfo(Id){
    return this.http.get<IAllDeviceData>(`http://35.210.149.21:3000/device/${Id}/latest`);
  }

  GetDevicePassword(Id) {
    return this.http.get<IPassword>(`http://35.210.149.21:3000/device/${Id}/password`);
  }

  UpdateNameDevice(deviceId, name) : Observable<IDevice>{
    console.log('update name in service');
    var putJson = {
      ID: deviceId,
      Name: name
    }
    console.log(putJson.Name)
    return this.http.put<IDevice>(`http://35.210.149.21:3000/device/${deviceId}`, putJson, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  UpdatePasswordDevice(deviceId, newPassword) : Observable<IDevice>{
    console.log('update password in service');
    var putJson = {
      ID: deviceId,
      Password: newPassword
    }
    console.log(putJson.Password)
    return this.http.put<IDevice>(`http://35.210.149.21:3000/device/${deviceId}/password`, putJson, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  UpdateReset1(deviceId,newPassword,newName) : Observable<IDevice>{
    console.log('update default password and device name in service');
    var putJson = {
      ID: deviceId,
      Password: newPassword,
      Name: newName
    }
    console.log(putJson.Password)
    console.log(putJson.Name)
    return this.http.put<IDevice>(`http://35.210.149.21:3000/device/${deviceId}`, putJson, {
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

UpdateReset2(dataId,newTemperature,newHumidity,newMoisture) : Observable<IDeviceData>{
  console.log('update reset temperature , humditity and moisture in service');
  var putJson = {
    ID: dataId,
    Temperature: newTemperature,
    Humidity: newHumidity,
    Moisture: newMoisture
  }
  console.log(putJson.Temperature)
  console.log(putJson.Humidity)
  console.log(putJson.Moisture)
  return this.http.put<IDeviceData>(`http://35.210.149.21:3000/data/${dataId}`, putJson, {
    headers:new HttpHeaders({
      'Content-Type': 'application/json'
    })
  })
}
}

export interface IAllDeviceData{
  ID: number;
	Device_ID: number;
	Temperature: number;
  Humidity: number;
  Moisture: number;
  Time: Date;
  Date: Date;
  Battery: Number;
  Password: String;
  Name: String;
  Status: number;
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
  Status: number;
}

export interface IPassword {
	Password: string;
}


