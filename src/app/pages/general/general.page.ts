import { ThemeService } from './../../services/theme.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import { APIService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {

  DataDevice: DeviceData;
  IDDevice: DeviceID;

  constructor(private data: APIService) { }
  DoSearch(){
    this.data.devicedata().subscribe((info) => {
    this.DataDevice = {
      ID: info[0].ID,
      DeviceID: info[0].DeviceID,
      Temperature: info[0].Temperature,
      Humidity: info[0].Humidity,
      Moisture: info[0].Moisture,
      Time: info[0].Time,
      Date: info[0].Date,
      Battery: info[0].Battery
    };
    })
  }

  ngOnInit() {

  }

}

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

export interface DeviceID {
	ID: number;
	Password: string;
	Name: string;
}