import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title="asfsf";

  constructor(private router: Router) {}
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    // Eliminar el token y redirigir a la página de inicio
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}

  


