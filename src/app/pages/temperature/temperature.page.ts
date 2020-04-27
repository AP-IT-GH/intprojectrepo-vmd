import { StorageService, IexeedEntry } from './../../Services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from "chart.js";
import { APIService, IAllDeviceData } from 'src/app/Services/api.service';
import { DatePipe } from '@angular/common';
import { interval } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.page.html',
  styleUrls: ['./temperature.page.scss'],
  providers: [DatePipe]
})
export class TemperaturePage implements OnInit {

  tempEntries: IexeedEntry[] = [];
  newTempEntry: IexeedEntry = <IexeedEntry>{};
  rangeCountEntry: IexeedEntry = <IexeedEntry>{};
  chartData: ChartDataSets[] = [{ data: [], label: 'Temperature', fill: false }];
  chartLabels: String[];
  metric: String = "celcius";

  DataDevice: IAllDeviceData;
  DataDeviceArray: IAllDeviceData[];

  // Options the chart - Visualisation
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    responsiveAnimationDuration: 1500,
    aspectRatio: 3,
    layout: {
      padding: {
        left: 0,
        right: 35,
        top: 0,
        bottom: 0
      }
    },
    title: {
      display: true,
      text: 'Temperature for Device 1'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartType = 'line';
  showLegend = false;

  constructor(public toastController: ToastController,
    private plt: Platform,
    private APIService: APIService,
    private storage: StorageService,
    public datepipe: DatePipe) {
    this.plt.ready().then(() => {
      this.loadTempEntries();
    })

    this.GetLatestData();
    this.GetAllInfoDevice(this.metric);
    interval(60000).subscribe(x => { //* will execute every 5 seconds
      this.GetLatestData();
      this.GetAllInfoDevice(this.metric);
    });
  }

  async ngOnInit() { //TODO: selected device hier nog op toepassen
    this.APIService.GetLatestSingleDeviceInfo(1).subscribe(DataDevice => { //TODO: device ID moet een variabele zijn in de toekomst.
      this.DataDevice = DataDevice;
    })
  }

  //* ADD Entry
  addTempEntry(tempEntry: IexeedEntry) {
    this.newTempEntry.id = Date.now();
    this.storage.addEntry(tempEntry).then(entry => {
      this.newTempEntry = <IexeedEntry>{};
      this.showToast('Temperature Entry Added');
      this.loadTempEntries();
    })
  }

  GetAllInfoDevice(metric: String) {
    this.APIService.GetDeviceDataSingle(1).subscribe(res => {
      console.log('Res: ', res)

      this.chartData[0].data = [];
      this.chartLabels = [];

      for (let entry of res) {
        this.chartLabels.push(this.datepipe.transform(entry.Date, 'd/MM/y'));
        if (metric == "celcius") {
          this.chartData[0].data.push(entry['Temperature']);
        }
        else {
          this.chartData[0].data.push((entry['Temperature'] * 1.8) + 32);
        }
      }
    });
  }

  // Load Entries
  loadTempEntries() {
    this.storage.getEntries().then(tempEntries => {
      this.tempEntries = tempEntries;
    })
  }

  // Remove Entry
  removeTempEntry(ID: number) {
    this.storage.deleteEntry(ID);
  }

  // Remove All Entries
  removeAllTempEntries() {
    this.storage.deleteAllEntries();
  }

  //instellen van een limiet: 
  public rangeCount: number = 50;
  public packetNumber: number = 100;
  private lastSavedDate: Date;

  GetLatestData() {
    this.APIService.GetLatestSingleDeviceInfo(1).subscribe(DataDevice => {
      this.DataDevice = DataDevice;
      if (this.DataDevice.Temperature > this.rangeCount && this.DataDevice.Date != this.lastSavedDate
      ) {

        this.newTempEntry.temperature = this.DataDevice.Temperature;
        this.newTempEntry.date = this.DataDevice.Date;
        this.newTempEntry.time = this.DataDevice.Time;
        this.lastSavedDate = this.DataDevice.Date;
        this.addTempEntry(this.newTempEntry)

        //* Notification
        var message = {
          app_id: "b16686d2-04a8-468a-8658-7b411f0a777b",
          contents: { "en": "The temperature of '" + DataDevice.Name + "' is higher than your given temperature! The temperature value is now " + DataDevice.Temperature },
          included_segments: ["All"]
        };

        this.APIService.SendNotification(message).subscribe(data => {
          console.log('Notification sent');
          console.log(data);
        },
          err => {
            alert(err);
          });
      }
    });
  }

  typeChanged(e) {
    const on = e.detail.checked;
    this.chartType = on ? 'line' : 'bar';
  }

  //* Helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  TempSegmentChanged(event: any) {
    if (event.target.value == "celcius") {
      this.metric = "celcius";
      this.GetAllInfoDevice(this.metric);
    }
    else if (event.target.value == "fahrenheit") {
      this.metric = "fahrenheit"
      this.GetAllInfoDevice(this.metric);
    }
  }
}