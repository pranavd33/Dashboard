import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selection.html',
  styleUrls: ['./selection.css']
})
export class SelectionComponent {
  constructor(private router: Router) {}

  selectCategory(type: string) {
    this.router.navigate(['/details', type]);
  }
  
  goBack() {
    this.router.navigate(['/']);
  }
}