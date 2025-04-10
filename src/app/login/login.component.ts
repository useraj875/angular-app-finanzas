// src/app/login/login.component.ts
// Minor change: Redirect to '/dashboard' instead of '/menu'
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; // Import Router
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service'; // Import the existing service

@Component({
  selector: 'app-login',
  standalone: true, // Make sure it's standalone if generated that way
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Use styleUrls
  providers: [DataService] // Provide service here if not providedIn: 'root'
})
export class LoginComponent {

  nombre = '';
  contrasena = '';
  error: string | null = null;
  mensaje = '';
  modo: 'login' | 'registro' = 'login'; // modo actual

  constructor(private dataService: DataService, private router: Router) {} // Inject Router

  login() {
    this.error = null; // Clear previous errors
    this.mensaje = '';
    this.dataService.login(this.nombre, this.contrasena).subscribe({
      next: (res) => {
        this.mensaje = 'Inicio de sesión exitoso';
        console.log('Token:', res.token);
        localStorage.setItem('token', res.token); // Store the token

        // Redirect to the main dashboard after successful login
        this.router.navigate(['/dashboard']); // <--- CHANGE HERE
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al iniciar sesión. Verifique nombre y contraseña.';
        console.error('Login error:', err); // Log the full error
      }
    });
  }

   registrar() {
    this.error = null; // Clear previous errors
    this.mensaje = '';
    this.dataService.registrar(this.nombre, this.contrasena).subscribe({
      next: (res) => {
        this.mensaje = 'Usuario registrado correctamente. Ahora puede iniciar sesión.';
        this.modo = 'login'; // Switch back to login mode
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al registrar el usuario.';
         console.error('Registration error:', err); // Log the full error
      }
    });
  }

  alternarModo() {
    this.error = null; // Clear errors when switching mode
    this.mensaje = '';
    this.modo = this.modo === 'login' ? 'registro' : 'login';
  }
}