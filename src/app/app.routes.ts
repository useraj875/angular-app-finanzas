import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { TipodegastoComponent } from './tipodegasto/tipodegasto.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IngresosListaComponent } from './pages/ingresos-lista/ingresos-lista.component';
import { AhorrosListaComponent } from './pages/ahorros-lista/ahorros-lista.component';

export const routes: Routes = [

    {path: 'tipodegasto', component:TipodegastoComponent}
     {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
     {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard - Control de Gastos' // Opcional: Título para la pestaña del navegador
  },
 
  {
    path: 'ingresos',
    component: IngresosListaComponent,
    title: 'Ingresos - Control de Gastos'
  },
  // Ruta para la lista de Ahorros
  {
    path: 'ahorros',
    component: AhorrosListaComponent,
    title: 'Ahorros - Control de Gastos'
  },
];





