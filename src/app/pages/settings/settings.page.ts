import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { FeaturetoggleService } from 'src/app/Services/featuretoggle.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public AutoRequestToDataBase:boolean = true;


  constructor(private ThemeService: ThemeService, private _featureToggleService:FeaturetoggleService) { }

  ngOnInit() {
  }
  toggleDarkMode(){
    this.ThemeService.toggleAppTheme();
  }

  public checkForChanges(){
    this._featureToggleService.sendmessage(this.AutoRequestToDataBase);
  }

}
