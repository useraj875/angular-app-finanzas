import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Necesario para <router-outlet>
import { NavegacionComponent } from './components/navegacion/navegacion.component'; // Importa tu componente de navegación

@Component({
  selector: 'app-root', // El selector raíz en index.html
  standalone: true,
  imports: [
    RouterModule,         // Importa RouterModule
    NavegacionComponent   // Importa tu NavegacionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Control de Gastos Personales'; // Puedes cambiar el título si quieres
}