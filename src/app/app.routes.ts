// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Importa los componentes de las páginas
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GastosListaComponent } from './pages/gastos-lista/gastos-lista.component';
import { IngresosListaComponent } from './pages/ingresos-lista/ingresos-lista.component';
import { AhorrosListaComponent } from './pages/ahorros-lista/ahorros-lista.component';

export const routes: Routes = [
  // Ruta por defecto: redirige al dashboard
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  // Ruta para el Dashboard
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard - Control de Gastos' // Opcional: Título para la pestaña del navegador
  },
  // Ruta para la lista de Gastos
  {
    path: 'gastos', // La URL que el usuario verá
    component: GastosListaComponent,
    title: 'Gastos - Control de Gastos'
  },
  // Ruta para la lista de Ingresos
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
  // Puedes añadir más rutas aquí (ej. configuración, perfil, etc.)
  // { path: '**', component: NotFoundComponent } // Una ruta 'catch-all' para páginas no encontradas (crea el componente si lo necesitas)
];