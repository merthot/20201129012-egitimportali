import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ders } from 'src/app/models/ders';
import { Sonuc } from 'src/app/models/sonuc';
import { FbservisService } from 'src/app/services/fbService.service';

@Component({
  selector: 'app-kayitduzenle',
  templateUrl: './kayitduzenle.component.html',
  styleUrls: ['./kayitduzenle.component.css']
})
export class KayitduzenleComponent implements OnInit {
  key: string;
  uid: string;
  dersler: Ders[];
  secDers: Ders = new Ders();
  sonuc: Sonuc = new Sonuc();
  constructor(
    public fbService: FbservisService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.DersListele();
    this.secDers.key = null;
  }

  DersGetir() {
    this.fbService.DersByKey(this.key).snapshotChanges().subscribe(data => {
      const y = { ...data.payload.toJSON(), key: this.key };
      this.secDers = (y as Ders);
    });
  }

  DersListele() {
    this.fbService.DersListele().snapshotChanges().subscribe(data => {
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
