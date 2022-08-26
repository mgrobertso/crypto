import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { CryptoService } from '../shared/crypto.service';
import { Icrypto } from './crypto-data-component-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { user } from '../shared/user';

@Component({
  selector: 'app-crypto-data-component',
  templateUrl: './crypto-data-component.component.html',
  styleUrls: ['./crypto-data-component.component.css'],
})
export class CryptoDataComponentComponent implements OnInit, OnDestroy {
  Title = 'Crypto';
  errorMessage= '';
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
  id ='';

  constructor(
    private cryptoDataService: CryptoService,
    private router: Router
  ) {}

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

  getCrypto(): void {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/crypto/' + 'bitcoin']));
  }

  addWatch(data: user) {
    //implement server side later
    //change button to remove
    //for now show name of added
    alert(data);
  }

  removeWatch(data: user) {
    //implement later
    alert(data)
  }
}
