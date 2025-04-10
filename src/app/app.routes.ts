// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Import Components
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GastosListaComponent } from './pages/gastos-lista/gastos-lista.component'; // Now contains CRUD
import { IngresosListaComponent } from './pages/ingresos-lista/ingresos-lista.component';
import { AhorrosListaComponent } from './pages/ahorros-lista/ahorros-lista.component';

import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  // Public route
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login - Control de Gastos'
  },

  // Protected routes
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, title: 'Dashboard - Control de Gastos' },
      {
        path: 'gastos', // This route now points to the component with CRUD
        component: GastosListaComponent,
        title: 'Gastos - Control de Gastos'
      },
      { path: 'ingresos', component: IngresosListaComponent, title: 'Ingresos - Control de Gastos' },
      { path: 'ahorros', component: AhorrosListaComponent, title: 'Ahorros - Control de Gastos' },
      // Remove the 'tipodegasto' route
      // { path: 'tipodegasto', component: TipodegastoComponent, title: 'Tipos de Gasto - Control de Gastos' }
    ]
  },

  // Fallback route
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];