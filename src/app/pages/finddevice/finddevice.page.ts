import { Component, OnInit, NgZone } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { BLE } from '@ionic-native/ble/ngx';
import { async } from '@angular/core/testing';
import { SubjectSubscriber } from 'rxjs/internal/Subject';

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

  public FoundDevices: any = [];
  public pairedDeviceID: number = 0;
  private datasend: string ="";
  constructor(private bluetoothSerial: BluetoothSerial, private ble: BLE, private ngZone: NgZone) {
    this.checkBluetoothEnabled();

  }

  ngOnInit() {

    //this.getAllBluetoothDevices();
  }

  checkBluetoothEnabled() {
    this.bluetoothSerial.isEnabled().then(success => {
      //this.FoundDevices();
      this.listpairedDevices();
    }, error => {
      alert("Please Enable Bluetooth");
    });
  }

    //add paired devices to list
    listpairedDevices(){
      this.bluetoothSerial.list().then(success =>{
        success.forEach(element => {
          this.FoundDevices.push(element)
        });
      }, error => {
        alert("Please enable bluetooth!");     
      });
    }

    selectDevice(){
      let connectedDevice = this.FoundDevices[this.pairedDeviceID];
      if(!connectedDevice.address){
        alert("Select a device to connect.");
        return;
      }
      let address = connectedDevice.address;
      let name = connectedDevice.name;
  
      this.connect(address)
    }
  
    //create connection
    connect(address){
      this.bluetoothSerial.connect(address).subscribe(success =>{
        this.deviceConnected();
      }, error =>{
        alert("Error: Connection to device." + error);//showtoast?
      });
    }
  
    deviceConnected(){
      this.bluetoothSerial.subscribe('\n').subscribe(success => {
        alert(success);
        alert("Device Connected!");
        //toast, connected successfully
      }, error => {
        alert(error);
      });
    }
  
    deviceDisconnected(){
      this.bluetoothSerial.disconnect();
      alert("Device Disconnected");
    }
  
    sendData(data){
      //this.datasend+='\n';
      this.bluetoothSerial.write(data).then(succes =>{
        alert(succes);
        alert("Data Sent!");
      }, error => {
        alert(error);
      });
    }


    //SEND DATA
  async SendCredentials() {

    //make a connection first
    await this.connect(this.SelectedBluetoothDevice);

     if (!this.password || !this.ssid) {
       return alert("Incorrect input!");
     } else {
       await this.sendData(this.password);
       await this.sendData(this.ssid);
     }
  }
}

