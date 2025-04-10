import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service'; // Import the existing service


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [DataService]
})
export class LoginComponent {

  nombre = '';
  contrasena = '';
  error: string | null = null;
  mensaje = '';
  modo: 'login' | 'registro' = 'login'; // modo actual

  constructor(private dataService: DataService, private router: Router) {}
  login() {
    this.error = '';
    this.mensaje = '';
    this.dataService.login(this.nombre, this.contrasena).subscribe({
      next: (res) => {
        this.mensaje = 'Inicio de sesión exitoso';
        console.log('Token:', res.token);
        // Podés guardar el token en localStorage o redirigir
        localStorage.setItem('token', res.token);

        this.router.navigate(['/menu']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al iniciar sesión';
      }
    });
  }

   registrar() {
    this.error = '';
    this.mensaje = '';
    this.dataService.registrar(this.nombre, this.contrasena).subscribe({
      next: (res) => {
        this.mensaje = 'Usuario registrado correctamente';
        this.modo = 'login'; // Volver al login automáticamente
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al registrar';
      }
    });
  }

  alternarModo() {
    this.error = '';
    this.mensaje = '';
    this.modo = this.modo === 'login' ? 'registro' : 'login';
  }


}
