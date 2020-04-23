import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { FeaturetoggleService } from 'src/app/Services/featuretoggle.service';
import { APIService, IDevice } from 'src/app/Services/api.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit {
  md5 = new Md5();
  public AutoRequestToDataBase:boolean = true;
  DeviceNameChange: IDevice;
  Device: IDevice[];
  SelectedDevice: string;
  Selected: string;
  newNameforDevice: string;
  oldPassword: string;
  newPassword: string;
  defaultPasswordOfDevice: string = "admin"
  defaultNameOfDevice: string = "admin"
  id: number;

  constructor(private APIService: APIService, private ThemeService: ThemeService, private _featureToggleService:FeaturetoggleService) { }

  async ngOnInit() {
    this.APIService.GetDeviceInfogeneral().subscribe(Device => {
      this.Device = Device;
    })
  }

  toggleDarkMode() {
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
    this.APIService.UpdateNameDevice(11, this.newNameforDevice).subscribe(device => this.Device.push(device));
  }

  ApplyPasswordChange(){
    console.log(this.oldPassword);
    console.log(this.newPassword);
    
    if (this.oldPassword == this.newPassword) {
      this.APIService.UpdatePasswordDevice(11, this.md5.appendStr(this.newPassword).end()).subscribe(device => this.Device.push(device));
    }
    else
    {
      console.log("Passwords do not match!");
    }
  }
 HardResetDevice(){
   this.APIService.UpdateResetDevice(11,this.defaultNameOfDevice,this.defaultPasswordOfDevice).subscribe(device => this.Device.push(device));
 }
}