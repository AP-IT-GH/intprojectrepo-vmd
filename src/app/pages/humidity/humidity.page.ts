import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartDataSets } from "chart.js";
import { APIService, IAllDeviceData } from 'src/app/Services/api.service';
import { ToastController } from '@ionic/angular';
import { interval } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.page.html',
  styleUrls: ['./humidity.page.scss'],
  providers: [DatePipe]
})
export class HumidityPage implements OnInit {

  chartData: ChartDataSets[] = [{ data: [], label: 'Humidity', fill: false}];
  chartLabels: String[];

  DataDevice: IAllDeviceData;
  DataDeviceArray : IAllDeviceData[];

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

  constructor(public toastController:ToastController, private APIService: APIService,public datepipe: DatePipe) { 
    this.GetAllInfoDevice();
    interval(60000).subscribe(x => { // will execute every minute
    this.GetAllInfoDevice();
  });
  }

  async ngOnInit() {
        //limiet instellen
        this.APIService.GetLatestSingleDeviceInfo(1).subscribe(DataDevice=>{ //device ID moet een variabele zijn in de toekomst.
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
        this.chartData[0].data.push(entry['Humidity']);
      }
    })
  }
  

  
    typeChanged(e){
      const on = e.detail.checked;
      this.chartType = on ? 'line' : 'bar';
    }
}
  