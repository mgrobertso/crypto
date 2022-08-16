import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { CryptoService } from '../shared/crypto.service';
import { Icrypto } from './crypto-data-component-datasource';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-crypto-data-component',
  templateUrl: './crypto-data-component.component.html',
  styleUrls: ['./crypto-data-component.component.css'],
})
export class CryptoDataComponentComponent implements OnInit, OnDestroy {
  Title: string = 'Crypto';
  errorMessage: string = '';
  sub: Subscription | undefined;
  displayedColumns: string[] = [
    'market_cap_rank',
    'image',
    'name',
    'current_price',
    'high_24h',
    'low_24h',
    'total_volume',
  ];
  dataSource!: MatTableDataSource<Icrypto>;

  constructor(private cryptoDataService: CryptoService) {}

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.sub = this.cryptoDataService.getCrypto().subscribe((stream) => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.direction}ending`);
    } else {
      console.log('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
