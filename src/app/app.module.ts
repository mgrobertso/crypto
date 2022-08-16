import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CryptoDataComponentComponent } from './crypto-data-component/crypto-data-component.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { DetailComponent } from './detail.component';
import { MenuComponent } from './menu.component';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [AppComponent, CryptoDataComponentComponent, DetailComponent, MenuComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSortModule,
    MatIconModule,
    NgChartsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      { path: 'crypto', component: CryptoDataComponentComponent },
      { path: 'crypto/:id', component: DetailComponent },
      { path: '', redirectTo: 'crypto', pathMatch: 'full' },
      { path: '**', redirectTo: '/', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
