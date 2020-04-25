import { Component, OnInit } from '@angular/core';
import { IexeedEntry, StorageService } from './../../Services/storage.service';
import { Chart, ChartDataSets } from "chart.js";
import { APIService, IDeviceData, IAllDeviceData } from 'src/app/Services/api.service';
import { ToastController, Platform } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-moisture',
  templateUrl: './moisture.page.html',
  styleUrls: ['./moisture.page.scss'],
})
export class MoisturePage implements OnInit {
  entries: IexeedEntry[] = [];
  newEntry: IexeedEntry = <IexeedEntry>{};
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
      text: 'Humidity for Device 1'
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


  private today = new Date();
  constructor(private storage: StorageService, public toastController:ToastController, private APIService: APIService,public datepipe: DatePipe) { 
    this.GetAllInfoDevice();
    interval(60000).subscribe(x => { // will execute every minute
    this.GetAllInfoDevice();
  });
  }

  async ngOnInit() { //TODO: selected device hier nog op toepassen
    this.APIService.GetLatestSingleDeviceInfo(1).subscribe(DataDevice => { //TODO: device ID moet een variabele zijn in de toekomst.
      this.DataDevice = DataDevice;
    })
  }
    //* Load Entries
    loadEntries() {
      this.storage.getEntries().then(entries => {
        this.entries = entries;
      })
    }
    GetAllInfoDevice() {

      this.APIService.GetDeviceDataSingle(1).subscribe(res => {
        console.log('Res: ', res)
  
        this.chartData[0].data = [];
        this.chartLabels = [];
  
  
        for (let entry of res) {
          this.chartLabels.push(this.datepipe.transform(entry.Date, 'd/MM/y'));
          this.chartData[0].data.push(entry['Humidity']);
        }
      })
    }
    GetLatestData() {
      this.APIService.GetLatestSingleDeviceInfo(1).subscribe(DataDevice => {
        this.DataDevice = DataDevice;
        if (this.DataDevice.Temperature > this.rangeCount && this.DataDevice.Date != this.lastSavedDate
        ) {
  
          this.newEntry.temperature = this.DataDevice.Temperature;
          this.newEntry.date = this.DataDevice.Date;
          this.newEntry.time = this.DataDevice.Time;
          this.lastSavedDate = this.DataDevice.Date;
          this.addEntry(this.newEntry)
  
          //* Notification
          var message = {
            app_id: "b16686d2-04a8-468a-8658-7b411f0a777b",
            contents: { "en": "The random number is higher than 8." }, //placeholder text
            included_segments: ["All"]
          };
  
          this.APIService.SendNotification(message).subscribe(data => {
            console.log('Het lukt');
            console.log(data);
          },
            err => {
              alert(err);
            });
  
        }
      });
    }
    //* ADD Entry
    addEntry(entry: IexeedEntry) {
    this.newEntry.id = Date.now();
    this.storage.addEntry(entry).then(entry => {
      this.newEntry = <IexeedEntry>{};
      this.showToast('Entry Added');
      this.loadEntries();
    })
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

  //instellen van een limiet: 
  public rangeCount: number = 50;
  public packetNumber: number = 100;
  private lastSavedDate: Date;

}
