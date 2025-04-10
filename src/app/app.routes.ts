import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { TipodegastoComponent } from './tipodegasto/tipodegasto.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IngresosListaComponent } from './pages/ingresos-lista/ingresos-lista.component';

import { AhorrosListaComponent } from './pages/ahorros-lista/ahorros-lista.component';
import { LoginComponent } from './login/login.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { CanActivate } from '@angular/router';
import { ProtectedComponent } from './protected/protected.component'; // Página protegida
import { AuthGuard } from './auth.guard';  // Asegúrate de importar el guard

export const routes: Routes = [

  
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirige a login por defecto
  { path: 'login', component: LoginComponent },  // Ruta para login
  { path: 'menu', component: NavegacionComponent, canActivate: [AuthGuard] },  // Ruta protegida
  { path: 'ingresos', component: IngresosListaComponent, canActivate: [AuthGuard] },{ path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },  // Ruta protegida
  { path: 'tipodegasto', component: TipodegastoComponent,canActivate: [AuthGuard] }, 
  { path: '**', redirectTo: '/login' }, // Redirige si la ruta no existe 

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
 


   {  path: 'ahorros',
    component: AhorrosListaComponent,
    title: 'Ahorros - Control de Gastos'
  },
];





