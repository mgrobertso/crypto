import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CryptoDataComponentComponent } from './crypto-data-component/crypto-data-component.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'crypto', component: CryptoDataComponentComponent,canActivate:[AuthGuard] },
  { path: 'crypto/:id', component: DetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  {path: 'search', component:SearchPageComponent,canActivate:[AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
