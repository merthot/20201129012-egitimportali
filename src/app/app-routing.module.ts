import { GrupuserComponent } from './components/grupuser/grupuser.component';
import { GrupComponent } from './components/grup/grup.component';
import { KayitduzenleComponent } from './components/kayitduzenle/kayitduzenle.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { DersComponent } from './components/ders/ders.component';
import { signupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { EgitimlerComponent } from './components/egitimler/egitimler.component';
import { HomeComponent } from './components/home/home.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectLogin = () => redirectUnauthorizedTo(['login']);


const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'anasayfa', component:HomeComponent },
  { path:'egitimler', component:EgitimlerComponent },
  { 
    path: 'adminpanel',
    component: AdminpanelComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
  { 
    path: 'kayitduzenle/:key',
    component: KayitduzenleComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
  {
    path: 'ders',
    component: DersComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
  {
    path: 'grup',
    component: GrupComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
  {
    path: 'grupuser',
    component: GrupuserComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
    
  { path:'login', component:LoginComponent},
  { path:'signup', component:signupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
