import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HumidityPageRoutingModule } from './humidity-routing.module';
import { HumidityPage } from './humidity.page';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    IonicModule,
    HumidityPageRoutingModule
  ],
  declarations: [HumidityPage]
})
export class HumidityPageModule {}
