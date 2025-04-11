// src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Gasto, Ingreso, Ahorro, Categoria, TipoIngreso, Usuario } from '../../models/models';

// Charting Library Imports
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

interface MonthlySummary {
  month: string;
  income: number; // It's here
  expenses: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // --- State, Data Storage, KPIs, Subscription (Keep as is) ---
  isLoading: boolean = true;
  errorMessage: string | null = null;
  private allGastos: Gasto[] = [];
  private allIngresos: Ingreso[] = [];
  private allAhorros: Ahorro[] = [];
  private allCategorias: Categoria[] = [];
  private allTiposIngreso: TipoIngreso[] = [];
  private allUsuarios: Usuario[] = [];
  kpiTotalUsers: number = 0;
  kpiTotalExpenses: number = 0;
  kpiTotalIncome: number = 0;
  kpiOverallBalance: number = 0;
  private dataSubscription: Subscription | undefined;


  // --- Chart Configurations & Data (Refined Options) ---

  // Expenses by Category (Pie Chart)
  public categoryExpenseChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { // *** ADDED TITLE ***
        display: true,
        text: 'Gastos por Categoría (Global)',
        font: { size: 14 }
      },
      legend: {
        display: true,
        position: 'bottom', // Keep legend at bottom
        labels: { padding: 10, boxWidth: 12, font: { size: 11 } } // Adjust padding/size
      },
      tooltip: { callbacks: { label: this.formatCurrencyLabel } }
    },
  };
  public categoryExpenseChartData: ChartData<'pie'> = { labels: [], datasets: [{ data: [], hoverOffset: 4 }] };
  public categoryExpenseChartType: ChartType = 'pie';

  // Income by Type (Pie chart)
  public incomeTypeChartOptions: ChartConfiguration['options'] = {
     responsive: true,
     maintainAspectRatio: false,
     plugins: {
       title: { // *** ADDED TITLE ***
         display: true,
         text: 'Ingresos por Tipo (Global)',
         font: { size: 14 }
       },
       legend: {
         display: true,
         position: 'bottom',
         labels: { padding: 10, boxWidth: 12, font: { size: 11 } } // Adjust padding/size
       },
       tooltip: { callbacks: { label: this.formatCurrencyLabel } }
     },
  };
  public incomeTypeChartData: ChartData<'pie'> = { labels: [], datasets: [{ data: [], hoverOffset: 4 }] };
  public incomeTypeChartType: ChartType = 'pie';

  // Monthly Trend (Line Chart)
  public trendChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { type: 'time', time: { unit: 'month', tooltipFormat: 'MMM yyyy' }, grid: { display: false }, ticks: { font: { size: 11 } } }, // Smaller ticks
      y: { beginAtZero: true, ticks: { callback: (value) => `$${value}`, font: { size: 11 } } } // Smaller ticks
    },
    plugins: {
      title: { // *** ADDED TITLE ***
        display: true,
        text: 'Tendencia Mensual Ingresos vs Gastos (Global)',
        font: { size: 14 }
      },
      legend: {
        display: true,
        position: 'top',
        labels: { boxWidth: 12, font: { size: 11 } } // Adjust size
      },
      tooltip: { mode: 'index', intersect: false, callbacks: { label: this.formatCurrencyLabel } }
    },
    interaction: { mode: 'index', intersect: false },
    elements: { // *** ADDED Point Styling ***
        point: {
            radius: 2, // Smaller points
            hoverRadius: 4
        },
        line: {
            borderWidth: 2 // Slightly thinner line
        }
    }
  };
  public trendChartData: ChartConfiguration['data'] = {
      labels: [],
      datasets: [
          { data: [], label: 'Ingresos Totales', borderColor: 'rgb(75, 192, 192)', backgroundColor: 'rgba(75, 192, 192, 0.1)', fill: true, tension: 0.2, type: 'line', order: 1 }, // Smoother tension
          { data: [], label: 'Gastos Totales', borderColor: 'rgb(255, 99, 132)', backgroundColor: 'rgba(255, 99, 132, 0.1)', fill: true, tension: 0.2, type: 'line', order: 2 } // Smoother tension
      ]
  };
  public trendChartType: ChartType = 'line';

  constructor(private dataService: DataService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void { /* Keep as is */ this.loadAggregateData(); }
  ngOnDestroy(): void { /* Keep as is */ this.dataSubscription?.unsubscribe(); }
  loadAggregateData(): void { /* Keep as is */ this.isLoading = true; this.errorMessage = null; this.dataSubscription = forkJoin({ gastos: this.dataService.getgastos(), ingresos: this.dataService.getIngresos(), ahorros: this.dataService.getAhorros(), categorias: this.dataService.getCategorias(), tiposIngreso: this.dataService.getTiposIngreso(), usuarios: this.dataService.getUsuarios() }).subscribe({ next: (data) => { this.allGastos = data.gastos || []; this.allIngresos = data.ingresos || []; this.allAhorros = data.ahorros || []; this.allCategorias = data.categorias || []; this.allTiposIngreso = data.tiposIngreso || []; this.allUsuarios = data.usuarios || []; this.calculateAggregateKPIs(); this.prepareCategoryExpenseChart(); this.prepareIncomeTypeChart(); this.prepareAggregateTrendChart(); this.isLoading = false; this.cdRef.detectChanges(); this.updateCharts(); }, error: (err) => { console.error('Error loading aggregate dashboard data:', err); this.errorMessage = 'Error al cargar los datos globales del dashboard.'; this.isLoading = false; this.cdRef.detectChanges(); } }); }
  private calculateAggregateKPIs(): void { /* Keep as is */ this.kpiTotalUsers = this.allUsuarios.length; this.kpiTotalExpenses = this.allGastos.reduce((sum, g) => sum + Number(g.monto), 0); this.kpiTotalIncome = this.allIngresos.reduce((sum, i) => sum + Number(i.monto), 0); this.kpiOverallBalance = this.kpiTotalIncome - this.kpiTotalExpenses; }
  private prepareCategoryExpenseChart(): void { /* Keep as is */ const gastosPorCategoria: { [key: number]: number } = {}; this.allGastos.forEach(gasto => { gastosPorCategoria[gasto.categoria_id] = (gastosPorCategoria[gasto.categoria_id] || 0) + Number(gasto.monto); }); const chartLabels: string[] = []; const chartDataValues: number[] = []; const backgroundColors: string[] = []; const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF', '#7E57C2', '#66BB6A']; let colorIndex = 0; Object.entries(gastosPorCategoria).sort(([, a], [, b]) => b - a).forEach(([categoriaIdStr, monto]) => { chartLabels.push(this.getCategoryName(Number(categoriaIdStr))); chartDataValues.push(monto); backgroundColors.push(colors[colorIndex % colors.length]); colorIndex++; }); this.categoryExpenseChartData.labels = chartLabels; this.categoryExpenseChartData.datasets[0].data = chartDataValues; this.categoryExpenseChartData.datasets[0].backgroundColor = backgroundColors; }
  private prepareIncomeTypeChart(): void { /* Keep as is */ const ingresosPorTipo: { [key: number]: number } = {}; this.allIngresos.forEach(ingreso => { ingresosPorTipo[ingreso.tipo_ingreso_id] = (ingresosPorTipo[ingreso.tipo_ingreso_id] || 0) + Number(ingreso.monto); }); const chartLabels: string[] = []; const chartDataValues: number[] = []; const backgroundColors: string[] = []; const colors = ['#66BB6A', '#42A5F5', '#FFA726', '#AB47BC', '#26A69A', '#FF7043', '#78909C']; let colorIndex = 0; Object.entries(ingresosPorTipo).sort(([, a], [, b]) => b - a).forEach(([tipoIdStr, monto]) => { chartLabels.push(this.getTipoIngresoName(Number(tipoIdStr))); chartDataValues.push(monto); backgroundColors.push(colors[colorIndex % colors.length]); colorIndex++; }); this.incomeTypeChartData.labels = chartLabels; this.incomeTypeChartData.datasets[0].data = chartDataValues; this.incomeTypeChartData.datasets[0].backgroundColor = backgroundColors; }
  private prepareAggregateTrendChart(): void {
    const monthlySummaries: { [key: string]: MonthlySummary } = {};
    const endDate = new Date();
    let minDate = new Date(endDate.getFullYear() - 1, endDate.getMonth(), 1);
    const allDates = [...this.allGastos.map(g => g.fecha), ...this.allIngresos.map(i => i.fecha)];
    allDates.forEach(dateStr => { try { const date = new Date(dateStr); if (!isNaN(date.getTime()) && date < minDate) { minDate = new Date(date.getFullYear(), date.getMonth(), 1); } } catch {} });
    const maxStartDate = new Date(endDate.getFullYear() - 2, endDate.getMonth(), 1);
    const startDate = minDate < maxStartDate ? maxStartDate : minDate;

    let tempDate = new Date(startDate);
    while (tempDate <= endDate) { const monthKey = `${tempDate.getFullYear()}-${String(tempDate.getMonth() + 1).padStart(2, '0')}`; monthlySummaries[monthKey] = { month: monthKey, income: 0, expenses: 0 }; tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 1); }

    this.allIngresos.forEach(i => { try { const date = new Date(i.fecha); if (!isNaN(date.getTime()) && date >= startDate && date <= endDate) { const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; if (monthlySummaries[monthKey]) monthlySummaries[monthKey].income += Number(i.monto); } } catch {} });
    this.allGastos.forEach(g => { try { const date = new Date(g.fecha); if (!isNaN(date.getTime()) && date >= startDate && date <= endDate) { const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; if (monthlySummaries[monthKey]) monthlySummaries[monthKey].expenses += Number(g.monto); } } catch {} });

    const sortedSummaries = Object.values(monthlySummaries).sort((a, b) => a.month.localeCompare(b.month));

    this.trendChartData.labels = sortedSummaries.map(s => new Date(s.month + '-01').getTime());

    if (this.trendChartData.datasets.length >= 2) {
        // *** Add explicit type (s: MonthlySummary) ***
        this.trendChartData.datasets[0].data = sortedSummaries.map((s: MonthlySummary) => s.income); // Income
        // *** Add explicit type (s: MonthlySummary) ***
        this.trendChartData.datasets[1].data = sortedSummaries.map((s: MonthlySummary) => s.expenses); // Expenses
    } else {
        console.error("Trend chart datasets not initialized correctly");
    }
  }
  getCategoryName(id: number): string { /* Keep as is */ return this.allCategorias.find(c => c.id === id)?.nombre || 'Desconocida'; }
  getTipoIngresoName(id: number): string { /* Keep as is */ return this.allTiposIngreso.find(t => t.id === id)?.nombre || 'Desconocido'; }
  formatCurrencyLabel(context: any): string { /* Keep as is */ let label = context.dataset.label || context.label || ''; if (label) { label += ': '; } let value = 0; if (context.parsed?.y !== undefined) { value = context.parsed.y; } else if (context.parsed !== undefined) { value = context.parsed; } label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value); return label; }
  updateCharts(): void { /* Keep as is */ if (this.chart?.chart) { this.chart.update(); } else { setTimeout(() => { if (this.chart?.chart) { this.chart.update(); } }, 100); } }

}