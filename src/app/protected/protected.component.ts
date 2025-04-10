import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-protected',
  imports: [],
  templateUrl: './protected.component.html',
  styleUrl: './protected.component.css'
})
export class ProtectedComponent {
 message = 'Bienvenido a la pagina protegida';


 constructor(private router: Router) {}

 ngOnInit() {
   const token = localStorage.getItem('token');
   if (!token) {
     this.router.navigate(['/login']);  // Redirigir al login si no hay token
   }
 }

}
