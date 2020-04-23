import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finddevice',
  templateUrl: './finddevice.page.html',
  styleUrls: ['./finddevice.page.scss'],
})
export class FinddevicePage implements OnInit {

  SelectedBluetoothDevice: String;
  BluetoothDevices: string[];
  ssid: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }

  SendCredentials(){
    
  }
}
