// src/app/components/navegacion/navegacion.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Need Router for logout
import { CommonModule } from '@angular/common'; // Might need for *ngIf if you add conditional elements

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [
    RouterModule, // For routerLink, routerLinkActive
    CommonModule
  ],
  templateUrl: './navegacion.component.html', // Use your ORIGINAL HTML
  styleUrls: ['./navegacion.component.css'] // Use your ORIGINAL CSS
})
export class NavegacionComponent {

  constructor(private router: Router) {}

  logout(): void {
    // Clear authentication token
    localStorage.removeItem('token');
    // Redirect to login page
    this.router.navigate(['/login']);
    // Optionally, you could emit an event to AppComponent to update its state immediately,
    // but the router navigation listener in AppComponent should handle it.
  }
}