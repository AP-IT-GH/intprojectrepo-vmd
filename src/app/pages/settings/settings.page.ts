import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { FeaturetoggleService } from 'src/app/Services/featuretoggle.service';
import { APIService, IDevice } from 'src/app/Services/api.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public AutoRequestToDataBase:boolean = true;

  Device: IDevice[];
  SelectedDevice: string;
  newNameforDevice:string;
  constructor(private APIService: APIService, private ThemeService: ThemeService, private _featureToggleService:FeaturetoggleService) { }

  async ngOnInit() {
    this.APIService.GetDeviceInfogeneral().subscribe(Device => {
      this.Device = Device;
    })
  }
  toggleDarkMode(){
    this.ThemeService.toggleAppTheme();
  }

  public checkForChanges(){
    this._featureToggleService.sendmessage(this.AutoRequestToDataBase);
  }


  GetDeviceData(){
    this.APIService.GetDeviceInfogeneral().subscribe(Device => {
      this.Device = Device;
    })
  }

  ApplyNewName(){
    console.log(this.newNameforDevice);
  }

}
