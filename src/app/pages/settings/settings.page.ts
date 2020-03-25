import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { APIService, IDevice } from 'src/app/Services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit {

  Device: IDevice[];
  constructor(private ThemeService: ThemeService, private APIService : APIService) { }

  ngOnInit() {
    this.APIService.GetDeviceInfogeneral().subscribe(Device =>{
    this.Device = Device;
  })
}

  toggleDarkMode(){
    this.ThemeService.toggleAppTheme();
  }

}
