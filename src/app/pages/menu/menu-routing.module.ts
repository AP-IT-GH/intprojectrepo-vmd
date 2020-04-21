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
        loadChildren: () => import('../general/general.module').then(m => m.GeneralPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'temperature',
        loadChildren: () => import('../temperature/temperature.module').then(m => m.TemperaturePageModule)
      },
      {
        path: 'humidity',
        loadChildren: () => import('../humidity/humidity.module').then(m => m.HumidityPageModule)
      },
      {
        path: 'moisture',
        loadChildren: () => import('../moisture/moisture.module').then(m => m.MoisturePageModule)
      },
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
