import { Component, OnInit, NgZone } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { BLE } from '@ionic-native/ble/ngx';
import { async } from '@angular/core/testing';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-finddevice',
  templateUrl: './finddevice.page.html',
  styleUrls: ['./finddevice.page.scss'],
})
export class FinddevicePage implements OnInit {

  password: string;
  ssid: string;

  //bluetooth variables
  BluetoothDevice: any;
  public FoundDevices: any = [];

  pairedDevices: any;
  unpairedDevices: any;
  gettingDevices: boolean;

  constructor(private bluetoothSerial: BluetoothSerial, private ble: BLE, private ngZone: NgZone) {
  }

  ngOnInit() {
    this.bluetoothSerial.enable();
    this.startScanning();
  }

  startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;
    const unPair = [];
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      success.forEach((value, key) => {
        var exists = false;
        unPair.forEach((val2, i) => {
          if (value.id === val2.id) {
            exists = true;
          }
        });
        if (exists === false && value.id !== '') {
          unPair.push(value);
        }
      });
      this.unpairedDevices = unPair;
      this.gettingDevices = false;
    },
      (err) => {
        console.log(err);
      });

    this.bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
    },
      (err) => {

      });
  }

  success = (data) => {
    this.deviceConnected();
  }
  fail = (error) => {
    alert(error);
  }

  async selectDevice(id: any) {
    this.bluetoothSerial.connect(id).subscribe(this.success, this.fail);
  }

  //connecting + sending data
  deviceConnected() {
    this.bluetoothSerial.isConnected().then(success => {

      if (this.password && this.ssid) {
        this.bluetoothSerial.write("ssid " + this.ssid);
        this.bluetoothSerial.write("pin " + this.password);
        this.disconnect();
      } else { alert("Ssid or password cannot be blank!"); this.disconnect(); }

    }, error => {
      alert('error' + JSON.stringify(error));
    });
  }

  async disconnect() {
    this.bluetoothSerial.disconnect();
  }

}

