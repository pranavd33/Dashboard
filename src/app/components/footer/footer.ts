import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer {
  // Static visibility flag so other components can toggle footer display
  static visible = true;

  // Instance getter so template can bind to `visible`
  get visible() { return Footer.visible; }

  today = new Date();

}
