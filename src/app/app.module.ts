import { GrupuserComponent } from './components/grupuser/grupuser.component';
import { GrupComponent } from './components/grup/grup.component';
import { KayitduzenleComponent } from './components/kayitduzenle/kayitduzenle.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { DersComponent } from './components/ders/ders.component';
import { signupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { environment } from './../environments/environment';
import { EgitimlerComponent } from './components/egitimler/egitimler.component';
import { HomeComponent } from './components/home/home.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EgitimlerComponent,
    DersComponent,
    AdminpanelComponent,
    KayitduzenleComponent,
    GrupComponent,
    GrupuserComponent,
    LoginComponent,
    signupComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

