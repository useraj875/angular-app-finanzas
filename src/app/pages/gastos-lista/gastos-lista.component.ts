import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Observable } from 'rxjs';
import { Gasto } from '../../models/models'; 
import { GastosService } from '../../services/gastos.service'; 

@Component({
  selector: 'app-gastos-lista',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './gastos-lista.component.html',
  styleUrl: './gastos-lista.component.css'
})
export class GastosListaComponent implements OnInit {


  public gastos$: Observable<Gasto[]> | undefined;

  // Inyecta el servicio GastosService en el componente
  constructor(private gastosService: GastosService) { }

  ngOnInit(): void {
    // Llama al método del servicio para obtener los gastos
    // y asigna el Observable resultante a la propiedad gastos$
    console.log('GastosListaComponent: Solicitando gastos...');
    this.gastos$ = this.gastosService.getGastos();
  }

  // Más adelante podrías añadir métodos para editar o eliminar gastos
  // editarGasto(id: number) { ... }
  // eliminarGasto(id: number) { ... }
}