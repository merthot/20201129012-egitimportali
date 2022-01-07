import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Ders } from 'src/app/models/ders';
import { Sonuc } from 'src/app/models/sonuc';
import { FbservisService } from 'src/app/services/fbService.service';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.css']
})
export class DersComponent implements OnInit {
  adsoyad: string;
  uid: string;
  dersler: Ders[];
  secDers: Ders = new Ders();
  sonuc: Sonuc = new Sonuc();
  constructor(
    public fbService: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.DersListele();
    this.secDers.key = null;
  }
  DersListele() {
    this.fbService.DersListeleByUID(this.uid).snapshotChanges().subscribe(data => {
      this.dersler = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.dersler.push(y as Ders);
      });
    });

  }
  DersDuzenle(ders: Ders) {
    Object.assign(this.secDers, ders);
  }
  DersSil(ders: Ders) {
    this.fbService.DersSil(ders.key).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Ders Silindi";
    });
  }
  Kaydet() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.secDers.uid = user.uid;
    var tarih = new Date();
    
    this.secDers.duzTarih = tarih.getTime().toString();

    if (this.secDers.key == null) {
      this.secDers.kayTarih = tarih.getTime().toString();
      this.fbService.DersEkle(this.secDers).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Ders Eklendi";
      });
    }
    else {
      this.fbService.DersDuzenle(this.secDers).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Ders Düzenlendi";
      });
    }
  }
  Vazgec() {
    this.secDers = new Ders();
    this.secDers.key = null;
  }


}