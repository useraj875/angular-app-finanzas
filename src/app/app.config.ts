// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router'; // Importa withComponentInputBinding si planeas pasar datos de ruta a inputs de componentes

import { routes } from './app.routes'; // Importa tus rutas

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()) // Provee las rutas a la aplicación
    // Aquí añadirás provideHttpClient() más tarde cuando necesites hacer llamadas API
    // import { provideHttpClient } from '@angular/common/http';
    // provideHttpClient()
  ]
};