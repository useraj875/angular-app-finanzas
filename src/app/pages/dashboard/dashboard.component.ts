// src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Use styleUrls
})
export class DashboardComponent implements OnInit {

  // Mock Data based on the design
  saldoActual: number = 2580.75;
  ingresosMes: number = 3500.00;
  gastosMes: number = 1920.25;
  saldoNeto: number = 1579.75; // ingresosMes - gastosMes

  // Mock data for budget progress
  presupuestos = [
    { categoria: 'Alimentación', gastado: 420, limite: 500, color: '#36A2EB' }, // Blue
    { categoria: 'Transporte', gastado: 210, limite: 300, color: '#FFCE56' }, // Yellow
    { categoria: 'Ocio', gastado: 180, limite: 200, color: '#FF6384' }, // Red
    { categoria: 'Servicios', gastado: 250, limite: 350, color: '#4BC0C0' }  // Teal
  ];

  // Mock data for expense distribution (for chart legend)
  distribucionGastos = [
      { categoria: 'Alimentación', color: '#36A2EB' },
      { categoria: 'Transporte', color: '#FFCE56' },
      { categoria: 'Ocio', color: '#FF6384' },
      { categoria: 'Servicios', color: '#4BC0C0' },
      { categoria: 'Otros', color: '#9966FF' } // Purple example
  ];


  constructor() { }

  ngOnInit(): void {
    // In a real scenario, you would fetch this data from a service
    console.log('Dashboard initialized');
  }

  // Helper function to calculate budget percentage
  getPorcentaje(gastado: number, limite: number): number {
    if (limite <= 0) return 0;
    return Math.min(Math.round((gastado / limite) * 100), 100); // Cap at 100%
  }

  // Helper function to determine progress bar color (optional, can be done in CSS too)
  getProgressBarClass(gastado: number, limite: number): string {
    const percentage = this.getPorcentaje(gastado, limite);
    if (percentage >= 90) return 'bg-danger'; // Red when close to or over limit
    if (percentage >= 75) return 'bg-warning'; // Yellow as a warning
    return 'bg-primary'; // Default blue/primary color
  }
}