import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';


@Component({
  selector: 'app-finddevice',
  templateUrl: './finddevice.page.html',
  styleUrls: ['./finddevice.page.scss'],
})
export class FinddevicePage implements OnInit {

  password: string;
  ssid: string;
  BluetoothDevices: string[];
  SelectedBluetoothDevice: String;
  constructor(private bluetoothserial: BluetoothSerial) { }

  ngOnInit() {
  }

  SendCredentials(){
    
  }
}
