import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartDataSets } from "chart.js";
import { APIService, IAllDeviceData } from 'src/app/Services/api.service';
import { interval } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.page.html',
  styleUrls: ['./temperature.page.scss'],
  providers: [DatePipe]
})
export class TemperaturePage implements OnInit {

  chartData: ChartDataSets[] = [{ data: [], label: 'Temperature', fill: false }];
  chartLabels: String[];

  DataDevice: IAllDeviceData;
  DataDeviceArray: IAllDeviceData[];

  // Options the chart - Visualisation
  chartOptions = {
    responsive: true,
    responsiveAnimationDuration: 1500,
    aspectRatio: 3,
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


  //* Contstructor
  constructor(public toastController: ToastController, private APIService: APIService, public datepipe: DatePipe) {
    this.GetAllInfoDevice();
    interval(60000).subscribe(x => { // will execute every minute
      this.GetAllInfoDevice();
    });
  }

  async ngOnInit() {
    //limiet instellen
    this.APIService.GetLatestSingleDeviceInfo(1).subscribe(DataDevice => { //device ID moet een variabele zijn in de toekomst.
      this.DataDevice = DataDevice;
    })
  }

  GetAllInfoDevice() {

    this.APIService.GetDeviceDataSingle(1).subscribe(res => {
      console.log('Res: ', res)

      this.chartData[0].data = [];
      this.chartLabels = [];


      for (let entry of res) {
        this.chartLabels.push(this.datepipe.transform(entry.Date, 'd/MM/y'));
        this.chartData[0].data.push(entry['Temperature']);
      }
    })
  }
  typeChanged(e){
    const on = e.detail.checked;
    this.chartType = on ? 'line' : 'bar';
  }
}
