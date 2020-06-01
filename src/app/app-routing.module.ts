import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignInRedirectCallbackComponent } from './signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback.component';
import { AuthGuardService } from './auth-guard.service';
import { SilentRenewCallbackComponent } from './silent-renew-callback.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'signin-callback', component: SignInRedirectCallbackComponent },
  { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
  { path: 'silent-renew-callback', component: SilentRenewCallbackComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
