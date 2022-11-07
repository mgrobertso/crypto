import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CryptoService } from '../shared/service/crypto.service';
import { Holding } from '../shared/model/company-holding';

@Component({
  selector: 'app-company-holding',
  templateUrl: './company-holding.component.html',
  styleUrls: ['./company-holding.component.css'],
})
export class CompanyHoldingComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  crypto!: Holding;

  id = this.route.snapshot.paramMap.get('id');
  constructor(private cryptoDataService: CryptoService,
  private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.cryptoDataService
      .getCompanyHolding(String(this.id))
      .subscribe((stream) => {
        this.crypto = stream;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
