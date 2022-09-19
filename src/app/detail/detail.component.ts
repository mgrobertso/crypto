import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataset } from 'chart.js';
import { Subscription } from 'rxjs';
import { Icrypto } from '../crypto-data-component/crypto-data-component-datasource';
import { cryptoInfo } from '../crypto-info/cryptoinfo';
import { CryptoService } from '../shared/service/crypto.service';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css'],
})
export class DetailComponent implements OnInit, OnDestroy {
  faDollarSign = faDollarSign;
  pageTitle = 'Detail';
  cryptodata: Icrypto[] = [];
  chartData: number[] = [];
  data: ChartDataset[] = [];
  chartLabel: string[] = [];
  sub: Subscription | undefined;
  sunCry!: Subscription;
  crypto!: cryptoInfo;
  legend = '';
  nextPage = '';
  backPage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cryptoDataService: CryptoService
  ) {}

  id = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.sub = this.cryptoDataService
      .getThisCrypto(String(this.id))
      .subscribe((stream) => {
        this.crypto = stream;
      });

    this.sub = this.cryptoDataService.getCrypto().subscribe((stream) => {
      this.cryptodata = stream;
      for (const i in this.cryptodata) {
        if (this.cryptodata[i].id == this.id) {
          this.chartLabel.push(this.cryptodata[i].name);
          this.chartData.push(
            this.cryptodata[i].current_price,
            this.cryptodata[i].high_24h,
            this.cryptodata[i].low_24h
          );
          this.legend = this.cryptodata[i].name;
          if (Number(i) <= 0) {
            this.backPage = this.cryptodata[0].id;
            this.nextPage = this.cryptodata[Number(i) + 1].id;
          } else if (Number(i) >= this.cryptodata.length - 1) {
            this.nextPage = this.cryptodata[this.cryptodata.length - 1].id;
            this.backPage = this.cryptodata[Number(i) - 1].id;
          } else {
            this.backPage = this.cryptodata[Number(i) - 1].id;
            this.nextPage = this.cryptodata[Number(i) + 1].id;
          }
        }
      }

      this.data = [
        {
          data: this.chartData,
          label: this.chartLabel.pop(),
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
    this.sub?.unsubscribe();
    this.sunCry?.unsubscribe();
  }

  onBack() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/crypto/' + this.backPage]));
  }

  onHome() {
    this.router.navigate(['/crypto']);
  }

  onNext() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/crypto/' + this.nextPage]));
  }
}
