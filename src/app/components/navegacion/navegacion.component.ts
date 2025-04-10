import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; // Necesario para routerLink y routerLinkActive
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navegacion', // Este es el tag que usarás en app.component.html
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css'
})
export class NavegacionComponent implements OnInit { 

  isAuthenticated: boolean = false;

  ngOnInit() {
    // Verifica si el token existe en el localStorage
    this.isAuthenticated = !!localStorage.getItem('token');
  }

  logout() {
    // Eliminar el token y redirigir al login
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  constructor(private router: Router) {}

}