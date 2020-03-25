import { ThemeService } from './../../services/theme.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {interval} from  'rxjs';
import { APIService, IAllDeviceData } from 'src/app/Services/api.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})

export class GeneralPage implements OnInit {

  DataDevice: IAllDeviceData;
  constructor(private APIService: APIService) { 
    interval(5000).subscribe(x => { // will execute every 30 seconds
      this.GetLatestData();
    });
  }

  async ngOnInit() {
  this.APIService.GetLatestSingleDeviceInfo(1).subscribe(DataDevice =>{
  this.DataDevice = DataDevice;
})}
GetLatestData(){
  this.APIService.GetLatestSingleDeviceInfo(1).subscribe(DataDevice =>{
    this.DataDevice = DataDevice;
})}}
