import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true, // Assuming Angular 14+ standalone components
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  // Static visibility flag so other components can toggle navbar display
  static visible = true;

  // Instance getter so template can bind to `visible`
  get visible() { return NavbarComponent.visible; }

  onSignOut() {
    console.log('Signing out...');
  }
}