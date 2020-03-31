import { Component, OnInit } from '@angular/core';
import { APIService, IDevice, IDeviceData } from 'src/app/Services/api.service';

@Component({
  selector: 'app-moisture',
  templateUrl: './moisture.page.html',
  styleUrls: ['./moisture.page.scss'],
})
export class MoisturePage implements OnInit {

  DataDevice: IDeviceData[];
  constructor(private APIService: APIService) { }

  async ngOnInit() {
this.APIService.GetDeviceDataAll().subscribe(DataDevice =>{
  this.DataDevice = DataDevice
})
  }

}
