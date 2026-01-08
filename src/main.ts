import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app'; // Points to your app.ts

// 1. Import Routes (Ensure you have this file, or see note below)
import { routes } from './app/app.routes'; 

// 2. Import Chart.js providers (CRITICAL for Dashboard)
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

bootstrapApplication(App, {
  providers: [
    // 3. Enable Routing
    provideRouter(routes),

    // 4. Enable Charts (Fixes the blank screen crash)
    provideCharts(withDefaultRegisterables()) 
  ]
}).catch((err) => console.error(err));