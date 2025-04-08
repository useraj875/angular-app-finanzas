import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Necesario para routerLink y routerLinkActive

@Component({
  selector: 'app-navegacion', // Este es el tag que usarás en app.component.html
  standalone: true,
  imports: [RouterModule], // Importa RouterModule aquí
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css'
})
export class NavegacionComponent { }