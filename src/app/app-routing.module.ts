import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoDataComponentComponent } from './crypto-data-component/crypto-data-component.component';
import { DetailComponent } from './detail.component';

const routes: Routes = [  { path: 'crypto', component: CryptoDataComponentComponent },
{ path: 'crypto/:id', component: DetailComponent },
{ path: '', redirectTo: 'crypto', pathMatch: 'full' },
{ path: '**', redirectTo: '/', pathMatch: 'full' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
