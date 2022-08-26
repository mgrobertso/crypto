import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CryptoService } from '../shared/crypto.service';
import { cryptoInfo } from './cryptoinfo';

@Component({
  selector: 'app-crypto-info',
  templateUrl: './crypto-info.component.html',
  styleUrls: ['./crypto-info.component.css'],
})






export class CryptoInfoComponent implements OnInit {
  data!: cryptoInfo;
  sub!: Subscription;
  id = 'bitcoin';
  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.sub = this.cryptoService.getThisCrypto(this.id).subscribe((stream) => {
      this.data = stream;
    });
  }
}
