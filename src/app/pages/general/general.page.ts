import { ThemeService } from './../../services/theme.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { interval } from 'rxjs';
import { APIService, IAllDeviceData, IDevice } from 'src/app/Services/api.service';
import { FeaturetoggleService } from 'src/app/Services/featuretoggle.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})

export class GeneralPage implements OnInit {

  private AutoRequestFromDatabase: boolean;
  //index = 1;
  //className: string = '';
  DataDevice: IAllDeviceData;
  Device: IDevice[];
  constructor(private APIService: APIService, private _featureToggleService: FeaturetoggleService) {
    interval(5000).subscribe(x => { // will execute every 30 seconds
      this.GetLatestData();
    });
    /*
    while (this.index > -1) {
      var getal = this.Device[this.index].Status;
      if (getal = 0) {
        this.className = 'offline';
      }
      else if (getal = 1) {
        this.className = 'online';
      }
      else if (getal = 2) {
        this.className = 'sleepmodus';
      }
      this.index++;
    }
    */
  }

  async ngOnInit() {
    this._featureToggleService.autoRefreshMessage$.subscribe(message => this.AutoRequestFromDatabase = message);   
      this.APIService.GetLatestSingleDeviceInfo(1).subscribe(DataDevice => {
        this.DataDevice = DataDevice;
      })
    
  }
  GetLatestData() {
    if (this.AutoRequestFromDatabase) {
      this.APIService.GetLatestSingleDeviceInfo(1).subscribe(DataDevice => {
        this.DataDevice = DataDevice;
      })
    } 
  }
}
    this.APIService.GetLatestDeviceInfo(1).subscribe(DataDevice => {
      this.DataDevice = DataDevice;
    })
    this.APIService.GetDeviceInfogeneral().subscribe(Device => {
      this.Device = Device;
    })
