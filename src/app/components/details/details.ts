import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class DetailsComponent implements OnInit {
  type: string = '';
  tableData: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // Get 'type' from URL (Loan, Saving, Investment)
    this.type = this.route.snapshot.paramMap.get('type') || '';
    // Fetch data
    this.tableData = this.dataService.getData(this.type);
  }

  goBack() {
    this.router.navigate(['/selection']);
  }
}