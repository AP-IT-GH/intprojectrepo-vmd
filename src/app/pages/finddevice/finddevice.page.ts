import { Component, OnInit, NgZone } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { BLE } from '@ionic-native/ble/ngx';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-finddevice',
  templateUrl: './finddevice.page.html',
  styleUrls: ['./finddevice.page.scss'],
})
export class FinddevicePage implements OnInit {

  password: string;
  ssid: string;
  BluetoothDevices: string[];
  SelectedBluetoothDevice: any;

  public FoundDevices:any = [];
  constructor(private bluetoothSerial: BluetoothSerial, private ble:BLE, private ngZone:NgZone) 
  {
  }

  ngOnInit() {
    this.bluetoothSerial.enable();
    //this.getAllBluetoothDevices();
  }

  async SendCredentials(){
    await this.ble.connect(this.SelectedBluetoothDevice).subscribe(data => alert("data" + JSON.stringify(data,null,2)));
    if(!this.password || !this.ssid){
      return alert("Incorrect input!");
    } else{
    await this.ble.write(this.SelectedBluetoothDevice,this.SelectedBluetoothDevice,this.SelectedBluetoothDevice,this.stringToBytes(this.password));
    await this.ble.write(this.SelectedBluetoothDevice, this.SelectedBluetoothDevice, this.SelectedBluetoothDevice, this.stringToBytes(this.ssid))
    }
  }


  stringToBytes(string:string){
    
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i< l; i++){
      array[i] = string.charCodeAt(i);
    }
    return array.buffer
    
    
  }


  async getAllBluetoothDevices(){
    this.ble.scan([],15).subscribe(device=> this.onDeviceDiscovered(device));
   }

   onDeviceDiscovered(device){
     //alert('Discovered' + JSON.stringify(device,null,2));

     this.ngZone.run(() =>{
       this.FoundDevices.push(device);
       //alert("Device Name: " + device.name + " DEVICE ID:" + device.id + " RSSI: " + device.rssi );
     });
   }

}

export interface IBluetoothDevices{
  id: string,
  rssi: string,
  name: string
}
