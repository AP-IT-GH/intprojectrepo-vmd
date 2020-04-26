import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartDataSets } from "chart.js";
import { APIService, IAllDeviceData } from 'src/app/Services/api.service';
import { ToastController, Platform } from '@ionic/angular';
import { interval } from 'rxjs';
import { DatePipe } from '@angular/common';
import { IexeedEntry, StorageService } from 'src/app/Services/storage.service';


@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.page.html',
  styleUrls: ['./humidity.page.scss'],
  providers: [DatePipe]
})
export class HumidityPage implements OnInit {

  humidEntries: IexeedEntry[] = [];
  newHumidEntry: IexeedEntry = <IexeedEntry>{};
  rangeCountEntry: IexeedEntry = <IexeedEntry>{};
  chartData: ChartDataSets[] = [{ data: [], label: 'Humidity', fill: false}];
  chartLabels: String[];

  DataDevice: IAllDeviceData;
  DataDeviceArray : IAllDeviceData[];

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
    
  constructor(public toastController:ToastController,
    private plt: Platform,
    private APIService: APIService,
    private storage: StorageService,
    public datepipe: DatePipe) { 
      this.plt.ready().then(() => {
        this.loadHumidEntries();
      })

      this.GetLatestData();
      this.GetAllInfoDevice();
      interval(60000).subscribe(x => { // will execute every minute
        this.GetLatestData();
        this.GetAllInfoDevice();
      });
    }

  async ngOnInit() {
    //limiet instellen
    this.APIService.GetLatestSingleDeviceInfo(1).subscribe(DataDevice => { //device ID moet een variabele zijn in de toekomst.
      this.DataDevice = DataDevice;
    })
  }

  //Add Entry
  addHumidEntry(humidEntry: IexeedEntry) {
    this.newHumidEntry.id = Date.now();
    this.storage.addEntry(humidEntry).then(entry => {
      this.newHumidEntry = <IexeedEntry>{};
      this.showToast('Humidity Entry Added');
      this.loadHumidEntries();
    })
  }

  //Load Entries
  loadHumidEntries(){
    this.storage.getEntries().then(humidEntries => {
      this.humidEntries = humidEntries;
    })
  }

  //Remove Entry
  removeHumidEntry(ID: number) {
    this.storage.deleteEntry(ID);
  }

  //Remove All Entries
  removeAllHumidEntries(){
    this.storage.deleteAllEntries();
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
  
  typeChanged(e){
    const on = e.detail.checked;
    this.chartType = on ? 'line' : 'bar';
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

        this.newHumidEntry.temperature = this.DataDevice.Temperature;
        this.newHumidEntry.date = this.DataDevice.Date;
        this.newHumidEntry.time = this.DataDevice.Time;
        this.lastSavedDate = this.DataDevice.Date;
        this.addHumidEntry(this.newHumidEntry)

        //* Notification
        var message = {
          app_id: "b16686d2-04a8-468a-8658-7b411f0a777b",
          contents: { "en": "The humidity level is higher than your given humidity level!" }, //placeholder text
          included_segments: ["All"]
        };

        this.APIService.SendNotification(message).subscribe(data => {
          console.log('The humidity is higher level than your given humidity level!');
          console.log(data);
        },
        err => {
          alert(err);
        });
      }
    });
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 200
    });
    toast.present();
  }
}
  