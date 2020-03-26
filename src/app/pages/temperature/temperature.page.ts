import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartDataSets } from "chart.js";
import { APIService, IAllDeviceData } from 'src/app/Services/api.service';
import {interval} from  'rxjs';
import { ToastController } from '@ionic/angular';
import { Label, Color } from 'ng2-charts';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.page.html',
  styleUrls: ['./temperature.page.scss'],
  providers: [DatePipe]
})
export class TemperaturePage implements OnInit {

  chartData: ChartDataSets[] = [{ data: [], label: 'Temperatuur'}];
  chartLabels: String[];
  dateString: String;
  day: String;
  month: String;
  year: String;
  dayNumber: number;
  monthNumber: number;
  yearNumber: number;
  



  DataDevice: IAllDeviceData;
  DataDeviceArray : IAllDeviceData[];
  private today = new Date();

  // Options the chart - Visualisation
  chartOptions = {
    responsive: true,
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
  chartColors: Color[] = [
    {
      borderColor: '#8a1c00',
      backgroundColor: '#cf6f57'
    }
  ];
  chartType = 'line';
  showLegend = false;


  //* Contstructor
  constructor(public toastController:ToastController, private APIService: APIService,public datepipe: DatePipe) { 
    this.GetAllInfoDevice();
    interval(60000).subscribe(x => { // will execute every minute
    this.GetLatestData();
    this.GetAllInfoDevice();
  });
}

  async ngOnInit() {
    //limiet instellen
    this.APIService.GetLatestSingleDeviceInfo(1).subscribe(DataDevice=>{ //device ID moet een variabele zijn in de toekomst.
      this.DataDevice = DataDevice;
    })
  }


  //* instellen van een limiet: 
  public rangeCount:number = 0;
  public message:string ="";
  public ExeedingLimitDate:Date[];
  public ExeedingTempValue:number[] = [];
  
  async setTempLimit(range:number) {
    range = this.rangeCount;
    const toast = await this.toastController.create({
      message: 'Limit set on ' + this.rangeCount + ' degrees.',
      duration: 2000
    });
    toast.present();
  }

  GetAllInfoDevice(){
    
    this.APIService.GetDeviceDataSingle(1).subscribe(res => {
      console.log('Res: ', res)

      this.chartData[0].data = [];
      this.chartLabels = [];
      
      
      for (let entry of res){
        this.chartLabels.push(this.datepipe.transform(entry.Date, 'd/MM/y'));
        this.chartData[0].data.push(entry['Temperature']);
      }
    })
}
typeChanged(e){
  const on = e.detail.checked;
  this.chartType = on ? 'line' : 'bar';
}

  GetLatestData(){
    this.APIService.GetLatestSingleDeviceInfo(1).subscribe(DataDevice =>{
      this.DataDevice = DataDevice;
      if(this.DataDevice.Temperature > this.rangeCount && this.DataDevice.Temperature != this.ExeedingTempValue[this.ReturnLastItemOfArray(this.ExeedingTempValue)]){ //en toch komen er dubbele entries in de array terecht..
          this.ExeedingTempValue.push(this.DataDevice.Temperature);
          console.log("It has happened! jooho " + this.ExeedingTempValue[0]);
          console.log(this.ExeedingTempValue.length);
      }})
}
   ReturnLastItemOfArray(array) {
     if(array.length -1 > 0){
      return array[array.length - 1];
     }
     else return 0;
}

}
