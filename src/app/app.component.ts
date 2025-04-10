// src/app/app.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule, NavigationEnd, Event } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

// Import your original navigation component
import { NavegacionComponent } from './components/navegacion/navegacion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,         // Needed for *ngIf
    RouterModule,         // Needed for <router-outlet>
    NavegacionComponent   // Your original sidebar component
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Use styleUrls instead of styleUrl if multiple
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Control de Gastos Personales';
  isAuthenticated: boolean = false;
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    // Initial check
    this.checkAuthStatus();

    // Listen to router events to update auth status dynamically
    // This helps if the user logs out without a full page refresh
    this.routerSubscription = this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkAuthStatus();
    });
  }

  ngOnDestroy() {
    // Clean up subscription
    this.routerSubscription?.unsubscribe();
  }

  checkAuthStatus(): void {
    // Check if the token exists in localStorage
    this.isAuthenticated = !!localStorage.getItem('token');
    // console.log('Auth Status Checked:', this.isAuthenticated); // For debugging
  }

  // This method might be called by NavegacionComponent via an Output event,
  // or NavegacionComponent can handle logout itself.
  // For simplicity, let NavegacionComponent handle its own logout logic.
}