import { Uye } from './../../models/uye';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FbservisService } from 'src/app/services/fbService.service';
import { Sonuc } from 'src/app/models/sonuc';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
  uyeler;
  secUye: Uye = new Uye();
  sonuc: Sonuc = new Sonuc();
  ekleduzenle: boolean = false;
  detay: boolean = false;
  silme: boolean = false;
  constructor(
    public fbService: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.UyeListele();
  }

  UyeListele() {
    this.fbService.UyeListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.uyeler = data;
    });
  }
  Kaydet() {
    var tarih = new Date();
    if (this.secUye.key == null) {
      this.secUye.kayTarih = tarih.getTime().toString();
      this.secUye.duzTarih = tarih.getTime().toString();
      this.secUye.islem = false;
      this.fbService.UyeEkle(this.secUye).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Eklendi";
      });
    } else {
      this.secUye.duzTarih = tarih.getTime().toString();
      this.secUye.islem = false;
      this.fbService.UyeDuzenle(this.secUye).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Güncellendi";
      });
    }
  }

  UyeSec(k: Uye) {
    Object.assign(this.secUye, k);

  }

  Sil() {

    this.fbService.UyeSil(this.secUye.key).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Silindi";
      this.silme = false;
    });
  }

}

