import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; 
import { Router } from '@angular/router';
import { ActivityComponent } from '../activity/activity';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,ActivityComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements AfterViewInit {

  // --- Modal State Variables ---
  showPnlModal = false;
  showReportModal = false;
  isDownloading = false;

  // --- Data for Profit & Loss Modal ---
  pnlData = [
    { month: 'JAN', income: 3000, expense: 2000 },
    { month: 'FEB', income: 5000, expense: 3500 },
    { month: 'MAR', income: 4000, expense: 2500 },
    { month: 'APR', income: 2500, expense: 4500 },
    { month: 'MAY', income: 3500, expense: 3000 },
    { month: 'JUN', income: 7000, expense: 5000 },
    { month: 'JUL', income: 3000, expense: 2000 }
  ];

  // --- Data for Full Report Modal ---
  reportData = {
    totalRevenue: "$ 128,450",
    netProfit: "$ 42,890",
    growth: "+ 18.5%",
    categories: [
      { name: "Loan Interest", percent: 75, color: "#2563eb" },       // Blue
      { name: "Investment Returns", percent: 45, color: "#f59e0b" },  // Orange
      { name: "Account Maintenance", percent: 30, color: "#8b5cf6" }, // Purple
      { name: "New User Signups", percent: 62, color: "#10b981" }     // Green
    ]
  };

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  ngAfterViewInit(): void {
    // Only run in browser
    if (isPlatformBrowser(this.platformId)) {
      
      // Delay to ensure HTML is rendered
      setTimeout(() => {
        this.animateNumbers();
        this.animateDonut();
        
        // Bar Chart Animation
        const bars = document.querySelectorAll('.bar') as NodeListOf<HTMLElement>;
        bars.forEach(bar => {
          bar.style.height = bar.getAttribute('data-h') || '0';
        });
      }, 100);
    }
  }

  // --- Navigation ---
  goToSelection() {
    this.router.navigate(['/selection']);
  }

  // --- 1. Incremental Number Animation (0 -> Target) ---
  animateNumbers() {
    if (!isPlatformBrowser(this.platformId)) return;

    const elements = document.querySelectorAll('[data-target]') as NodeListOf<HTMLElement>;
    
    elements.forEach(el => {
      const targetStr = el.getAttribute('data-target') || '0';
      const cleanTarget = parseFloat(targetStr.replace(/,/g, '')); // Remove commas (e.g., "2,434" -> 2434)
      
      const duration = 2000; // Animation lasts 2 seconds
      const stepTime = 20;   // Update every 20ms for smoothness
      const steps = duration / stepTime; // Total frames (e.g., 100 frames)
      
      // Calculate how much to add per step
      const increment = cleanTarget / steps;
      
      let currentVal = 0;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        
        if (currentStep >= steps) {
          // Final Step: Show exact target
          el.innerText = targetStr; 
          clearInterval(timer);
        } else {
          // Increment Logic: Add to current value
          currentVal += increment;
          // Show rounded number with commas
          el.innerText = Math.floor(currentVal).toLocaleString(); 
        }
      }, stepTime);
    });
  }

  // --- 2. Donut Chart Animation ---
  animateDonut() {
    if (!isPlatformBrowser(this.platformId)) return;

    const donut = document.querySelector('.donut-chart') as HTMLElement;
    const donutText = document.querySelector('.donut-inner') as HTMLElement;
    
    if(!donut) return;

    const targetPercent = parseInt(donut.getAttribute('data-percent') || '45');
    let current = 0;

    const timer = setInterval(() => {
      current++;
      if (current >= targetPercent) clearInterval(timer);
      
      donut.style.setProperty('--p', current + '%');
      if(donutText) donutText.textContent = current + '%';
    }, 20);
  }

  // --- 3. Modal Logic ---
  togglePnlModal() { 
    this.showPnlModal = !this.showPnlModal; 
  }
  
  toggleReportModal() { 
    this.showReportModal = !this.showReportModal; 
    
    if(this.showReportModal && isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const bars = document.querySelectorAll('.progress-fill') as NodeListOf<HTMLElement>;
        bars.forEach(bar => {
          bar.style.width = bar.getAttribute('data-width') || '0';
        });
      }, 100);
    }
  }

  calculateTotalProfit() {
    return this.pnlData.reduce((acc, curr) => acc + (curr.income - curr.expense), 0);
  }

  // --- 4. Download Button Animation ---
  startDownload() {
    this.isDownloading = true;
    setTimeout(() => {
      this.isDownloading = false;
    }, 2000);
  }
}