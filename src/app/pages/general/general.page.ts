import { ThemeService } from './../../services/theme.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import { APIService, IDevice, IDeviceData } from 'src/app/Services/api.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {

  DataDevice: IDeviceData[];
  constructor(private APIService: APIService) { }

  async ngOnInit() {
this.APIService.GetDevicedata().subscribe(DataDevice =>{
  this.DataDevice = DataDevice
})
  }

}