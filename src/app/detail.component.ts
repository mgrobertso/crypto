import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataset } from 'chart.js';
import { Subscription } from 'rxjs';
import { Icrypto } from './crypto-data-component/crypto-data-component-datasource';
import { CryptoService } from './shared/crypto.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Detail';
  cryptodata: Icrypto[] = [];
  chartData: number[] = [];
  data: ChartDataset[] = [];
  chartLabel: any;
  sub: Subscription | undefined;
  legend: string = '';
  nextpage: string = '';
  backpage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cryptoDataService: CryptoService
  ) {}

  private id = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.sub = this.cryptoDataService.getCrypto().subscribe((stream) => {
      this.cryptodata = stream;
      for (let i in this.cryptodata) {
        if (this.cryptodata[i].id == this.id) {
          this.chartLabel = this.cryptodata[i].name;
          this.chartData.push(
            this.cryptodata[i].current_price,
            this.cryptodata[i].high_24h,
            this.cryptodata[i].low_24h
          );
          this.legend = this.cryptodata[i].name;
          if (Number(i) <= 0) {
            this.backpage = this.cryptodata[0].id;
            this.nextpage = this.cryptodata[Number(i) + 1].id;
          } else if (Number(i) >= this.cryptodata.length - 1) {
            this.nextpage = this.cryptodata[this.cryptodata.length - 1].id;
            this.backpage = this.cryptodata[Number(i) - 1].id;
          } else {
            this.backpage = this.cryptodata[Number(i) - 1].id;
            this.nextpage = this.cryptodata[Number(i) + 1].id;
          }
        } else {
        }
      }

      this.data = [
        {
          data: this.chartData,
          label: this.chartLabel,
          fill: 'origin',
          backgroundColor: 'rgba(173,216,230)',
          borderColor: 'rgba(0,0,0)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(0,0,0)',
          borderJoinStyle: 'round',
          tension: 0.25,
          borderCapStyle: 'square',
        },
      ];
    });
  }

  chartLabels = ['Current Price', 'High', 'Low'];

  chartOptions = {
    responsive: true,
  };

  ngOnDestroy() {
    this.sub?.unsubscribe;
  }

  onBack() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/crypto/' + this.backpage]));
  }

  onHome() {
    this.router.navigate(['/crypto']);
  }

  onNext() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/crypto/' + this.nextpage]));
  }
}
