import { ThemeService } from './../../services/theme.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { interval } from 'rxjs';
import { APIService, IAllDeviceData } from 'src/app/Services/api.service';
import { FeaturetoggleService } from 'src/app/Services/featuretoggle.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})

export class GeneralPage implements OnInit {

  private AutoRequestFromDatabase: boolean;
  DataDevice: IAllDeviceData;

  constructor(private APIService: APIService, private _featureToggleService: FeaturetoggleService) {
    interval(5000).subscribe(x => { // will execute every 30 seconds
      this.GetLatestData();
    });
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
