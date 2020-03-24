import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import { APIService, IAllDeviceData } from 'src/app/Services/api.service';
import {interval} from  'rxjs';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.page.html',
  styleUrls: ['./temperature.page.scss'],
})
export class TemperaturePage implements OnInit {

  @ViewChild("lineCanvasDay", { static: true }) lineCanvasDay: ElementRef;
  @ViewChild("lineCanvasMonth", { static: true }) lineCanvasMonth: ElementRef;
  @ViewChild("lineCanvasHour", { static: true }) lineCanvasHour: ElementRef;


  private lineChartDay: Chart;
  private lineChartHour: Chart;
  private lineChartMonth: Chart;

  DataDevice: IAllDeviceData;

  private today = new Date();
  constructor(public toastController:ToastController, private APIService: APIService) { 
    interval(5000).subscribe(x => { // will execute every 5 seconds
    this.GetLatestData();
  });
}

  async ngOnInit() {
    //limiet instellen
    this.APIService.GetLatestDeviceInfo(1).subscribe(DataDevice=>{ //device ID moet een variabele zijn in de toekomst.
      this.DataDevice = DataDevice;
    })

    //LINECHART BEGIN
    //Linechart Day
    this.lineChartDay = new Chart(this.lineCanvasDay.nativeElement, {
      type: "line",
      data: {
        labels: [this.getDate(6), this.getDate(5), this.getDate(4), this.getDate(3), this.getDate(2), this.getDate(1), this.getDate(0)],

        datasets: [
          {
            label: "Average Daily Temperature",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [30, 25, 20, 15, 10, 0, -5, -10, -15, -20, -25],
            spanGaps: false
          }
        ]
      }
    });

    //linechart Hour
    this.lineChartHour = new Chart(this.lineCanvasHour.nativeElement, {
      type: "line",
      data: {
        labels: [(this.today.getHours()-6).toString(), (this.today.getHours()-5).toString(), (this.today.getHours()-4).toString(), (this.today.getHours()-3).toString(), (this.today.getHours()-2).toString(), (this.today.getHours()-1).toString(), this.today.getHours().toString()],
        datasets: [
          {
            label: "Average Hourly Temperature",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [30, 25, 20, 15, 10, 0, -5, -10, -15, -20, -25],
            spanGaps: false
          }
        ]
      }
    });

    //linechart Month
    this.lineChartMonth = new Chart(this.lineCanvasMonth.nativeElement, {
      type: "line",
      data: {
        labels: [this.getMonth(this.today.getMonth()-6), this.getMonth(this.today.getMonth()-5), this.getMonth(this.today.getMonth()-4),this.getMonth(this.today.getMonth()-3), this.getMonth(this.today.getMonth()-2), this.getMonth(this.today.getMonth()-1), this.getMonth(this.today.getMonth())],
        datasets: [
          {
            label: "Average Monthly Temperature",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [30, 25, 20, 15, 10, 0, -5, -10, -15, -20, -25],
            spanGaps: false
          }
        ]
      }
    });



  }

getDate(xDays:number){
  let tempDate = new Date()
  tempDate.setDate(tempDate.getDate() - xDays);
  return tempDate.toDateString();
}

  getMonth(value:number){
    switch(value){
      case -6: return "July";
      case -5: return "August";
      case -4: return "September";
      case -3: return "October";
      case -2: return "November";
      case -1: return "December";
      case 0: return "January";
      case 1: return "February";
      case 2: return "March";
      case 3: return "April";
      case 4: return "May";
      case 5: return "June";
      case 7: return "July";
      case 8: return "August";
      case 9: return "September";
      case 10: return "October";
      case 11: return "November";
      case 12: return "December";
    }
  }

  //instellen van een limiet: 
  public rangeCount:number = 0;
  public message:string ="";
  public ExeedingLimitDate:Date[];
  public ExeedingTempValue:number[] = [  ];
  
  async setTempLimit(range:number) {
    range = this.rangeCount;
    const toast = await this.toastController.create({
      message: 'Limit set on ' + this.rangeCount + ' degrees.',
      duration: 2000
    });
    toast.present();
  }

  GetLatestData(){
    this.APIService.GetLatestDeviceInfo(1).subscribe(DataDevice =>{
      this.DataDevice = DataDevice;
      console.log(this.DataDevice.Temperature);

      if(this.DataDevice.Temperature > this.rangeCount && this.DataDevice.Temperature != this.ExeedingTempValue[this.ReturnLastItemOfArray(this.ExeedingTempValue)]){ //en toch komen er dubbele entries in de array terecht..
          this.ExeedingTempValue.push(this.DataDevice.Temperature);
          console.log("It has happened! jooho " + this.ExeedingTempValue[0]);
          console.log(this.ExeedingTempValue.length);
      }
  })}

   ReturnLastItemOfArray(array) {
     if(array.length -1 > 0){
      return array[array.length - 1];
     }
     else return 0;
}

}
