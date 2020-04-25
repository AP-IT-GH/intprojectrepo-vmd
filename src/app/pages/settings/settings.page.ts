import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { FeaturetoggleService } from 'src/app/Services/featuretoggle.service';
import { APIService, IDevice, IPassword } from 'src/app/Services/api.service';
import {Md5} from 'ts-md5/dist/md5';
import { Router, RouterEvent } from '@angular/router';

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

  SelectedDevice: number;
  SelectedDeviceName: string;
  Selected: string;
  newNameforDevice: string;
  oldPassword: string;
  oldPasswordInDB: IPassword;
  newPassword: string;
  defaultPasswordOfDevice: string = "admin"
  defaultNameOfDevice: string = "admin"
  id: number;
  pageWifi = [{
    title: 'Wifi Credentials Page',
    url: '/menu/finddevice'
  }]
  selectedPath= '';

  constructor(private APIService: APIService, private ThemeService: ThemeService, private _featureToggleService:FeaturetoggleService, private router: Router) { 
    this.router.events.subscribe((event: RouterEvent)=>{
      this.selectedPath = event.url;
    })
  }

  async ngOnInit() {
    this.APIService.GetDeviceInfogeneral().subscribe(Device => {
      this.Device = Device;
    })
  }

  GetDeviceNameFromID() {
    for (let index = 0; index < this.Device.length; index++) {
      if (this.Device[index].ID == this.SelectedDevice) {
        this.SelectedDeviceName = this.Device[index].Name;
        break;
      }
    }
    return this.SelectedDeviceName;
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
    this.APIService.UpdateNameDevice(this.SelectedDevice, this.newNameforDevice).subscribe(device => this.Device.push(device));
  }

  ApplyPasswordChange(){
    this.APIService.GetDevicePassword(this.SelectedDevice).subscribe(Password => {
      this.oldPasswordInDB = Password;
    })

    if (this.oldPassword == this.oldPasswordInDB.Password) {
      this.APIService.UpdatePasswordDevice(this.SelectedDevice, this.md5.appendStr(this.newPassword).end()).subscribe(device => this.Device.push(device));
    }
    else
    {
      console.log("Passwords do not match!");
    }
  }

 HardResetDevice(){
   this.APIService.UpdateResetDevice(this.SelectedDevice,this.defaultNameOfDevice,this.defaultPasswordOfDevice).subscribe(device => this.Device.push(device));
 }
}