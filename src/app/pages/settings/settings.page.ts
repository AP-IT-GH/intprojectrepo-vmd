import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private ThemeService: ThemeService) { }

  ngOnInit() {
  }
  toggleDarkMode(){
    this.ThemeService.toggleAppTheme();
  }

}
