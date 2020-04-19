import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { FeaturetoggleService } from 'src/app/Services/featuretoggle.service';
import { AES256 } from '@ionic-native/aes-256';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public AutoRequestToDataBase:boolean = true;
  private secureKey: string;
  private secureIV: string;
  public oldPassword: string;
  public newPassword: string;


  constructor(private ThemeService: ThemeService, private _featureToggleService:FeaturetoggleService, private aes256: AES256) 
  { }

  ngOnInit() {
    this.generateSecureKeyAndIV(); //To generate the random secureKey and secureIV
  }


  toggleDarkMode(){
    this.ThemeService.toggleAppTheme();
  }

  public checkForChanges(){
    this._featureToggleService.sendmessage(this.AutoRequestToDataBase);
  }

  async generateSecureKeyAndIV(){
    this.secureKey = await this.aes256.generateSecureKey("12345678910123456789012345678901");
    this.secureIV = await this.aes256.generateSecureIV("1234567891123456");
  }

  async changePassword()
  {
    if(await this.aes256.decrypt(this.secureKey,this.secureIV, "HashFromDB") == this.oldPassword)
    {

    } else alert("Old Password is incorrect!");
  }
}
