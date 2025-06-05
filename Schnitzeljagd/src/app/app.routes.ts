import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'geolocation',
    loadComponent: () =>
      import('./geolocation/geolocation.page').then((m) => m.GeolocationPage),
  },
  {
    path: 'qrcode',
    loadComponent: () =>
      import('./qrcode/qrcode.page').then((m) => m.QrcodePage),
  },
  {
    path: 'sensors',
    loadComponent: () =>
      import('./sensors/sensors.page').then((m) => m.SensorsPage),
  },
  {
    path: 'charger',
    loadComponent: () =>
      import('./charger/charger.page').then((m) => m.ChargerPage),
  },
  {
    path: 'wifi',
    loadComponent: () => import('./wifi/wifi.page').then((m) => m.WifiPage),
  },
  {
    path: 'distance',
    loadComponent: () =>
      import('./distance/distance.page').then((m) => m.DistancePage),
  },
  {
    path: 'finished',
    loadComponent: () =>
      import('./finished/finished.page').then((m) => m.FinishedPage),
  },
];
