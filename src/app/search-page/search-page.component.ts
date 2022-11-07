import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Search } from '../shared/model/search';
import { CryptoService } from '../shared/service/crypto.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  searchData!: Search;
  @Output()
  search!: string;
  constructor(private cryptoDataService: CryptoService) {}

  ngOnInit(): void {
    this.search = '';
  }

  searchCrypto(data: string): void {
    this.sub = this.cryptoDataService.searchCrypto(data).subscribe((stream) => {
      this.searchData = stream;
      console.log(this.searchData);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
