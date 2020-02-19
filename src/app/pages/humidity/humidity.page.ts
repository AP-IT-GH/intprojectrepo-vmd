import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.page.html',
  styleUrls: ['./humidity.page.scss'],
})
export class HumidityPage implements OnInit {
  @ViewChild("lineCanvasDay", { static: true }) lineCanvasDay: ElementRef;
  @ViewChild("lineCanvasMonth", { static: true }) lineCanvasMonth: ElementRef;
  @ViewChild("lineCanvasHour", { static: true }) lineCanvasHour: ElementRef;
  private lineChartDay: Chart;
  private lineChartHour: Chart;
  private lineChartMonth: Chart;

  private today = new Date();
  private ReturnDate: Date = new Date();
  constructor() { }

  ngOnInit() {

    this.lineChartDay = new Chart(this.lineCanvasDay.nativeElement, {
      type: "line",
      data: {
        labels: [this.getDate(6).toDateString(), this.getDate(5).toDateString(), this.getDate(4).toDateString(), this.getDate(3).toDateString(), this.getDate(2).toDateString(), this.getDate(1).toDateString(), this.getDate(0).toDateString()],
        datasets: [
          {
            label: "Average Daily Humidity",
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
            data: [79, 61, 23, 57, 21, 17, 36, 44, 56, 63, 58],
            spanGaps: false
          }
        ]
      }
    });

    this.lineChartHour = new Chart(this.lineCanvasHour.nativeElement, {
      type: "line",
      data: {
        labels: [(this.today.getHours()-6).toString(), (this.today.getHours()-5).toString(), (this.today.getHours()-4).toString(), (this.today.getHours()-3).toString(), (this.today.getHours()-2).toString(), (this.today.getHours()-1).toString(), this.today.getHours().toString()],
        datasets: [
          {
            label: "Average Hourly Humidity",
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
            data: [79, 61, 23, 57, 21, 17, 36, 44, 56, 63, 58],
            spanGaps: false
          }
        ]
      }
    });

    this.lineChartMonth = new Chart(this.lineCanvasMonth.nativeElement, {
      type: "line",
      data: {
        labels: [this.getMonth(this.today.getMonth()-6), this.getMonth(this.today.getMonth()-5), this.getMonth(this.today.getMonth()-4),this.getMonth(this.today.getMonth()-3), this.getMonth(this.today.getMonth()-2), this.getMonth(this.today.getMonth()-1), this.getMonth(this.today.getMonth())],
        datasets: [
          {
            label: "Average Monthly Humidity",
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
            data: [80, 60, 22, 35, 10, 65, 85, 74, 43, 59, 27],
            spanGaps: false
          }
        ]
      }
    });



  }
  getDate(xDays: number) {
    this.ReturnDate.setDate(this.today.getDate() - xDays);
    let newDate = new Date(this.today.getFullYear + '-' + this.today.getMonth + '-' + this.ReturnDate)
    return newDate;
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

}
  