import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- 1. Import this
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,NavbarComponent,Footer], 
  templateUrl: './app.html', // Ensure this matches your file name
  styleUrls: ['./app.css']
})
export class App {
  title = 'compserv-dashboard';
}