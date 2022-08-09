import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from './shared/crypto.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  pageTitle: string = 'Detail';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cryptoDataService: CryptoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pageTitle += `:${id}`;
  }

  chartData = [
    {
      data: [330, 600, 260, 700],
      label: 'A ',
    },
    {
      data: [120, 455, 100, 340],
      label: 'Account B',
    },
    {
      data: [45, 67, 800, 500],
      label: 'Account C',
    },
  ];

  chartLabels = ['January', 'February', 'March', 'April'];

  chartOptions = {
    responsive: true,
  };

  onBack() {
    this.router.navigate(['/crypto']);
  }
}
