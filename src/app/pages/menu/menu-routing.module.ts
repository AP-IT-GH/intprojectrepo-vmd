import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'general',
        loadChildren: '../general/general.module#GeneralPageModule'
      },
      {
        path: 'settings',
        loadChildren: '../settings/settings.module#SettingsPageModule'
      },
      {
        path: 'temperature',
        loadChildren: '../temperature/temperature.module#TemperaturePageModule'
      },
      {
        path: 'humidity',
        loadChildren: '../humidity/humidity.module#HumidityPageModule'
      },
      {
        path: 'moisture',
        loadChildren: '../moisture/moisture.module#MoisturePageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'menu/general'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
