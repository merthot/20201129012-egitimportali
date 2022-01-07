import { Grup } from './../../models/grup';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/sonuc';
import { FbservisService } from 'src/app/services/fbService.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-grup',
  templateUrl: './grup.component.html',
  styleUrls: ['./grup.component.css']
})
export class GrupComponent implements OnInit {
  gruplar:any;
  secGrup: Grup = new Grup();
  sonuc: Sonuc = new Sonuc();
  constructor(
    public fbService: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.GrupListele();
    this.secGrup.key = null;
  }
  GrupListele() {
    this.fbService.GrupListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.gruplar = data;
    });

  }
  GrupDuzenle(grup: Grup) {
    Object.assign(this.secGrup, grup);
  }
  GrupSil(grup: Grup) {
    this.fbService.GrupSil(grup.key).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Grup Silindi";
    });
  }
  Kaydet() {
    var tarih = new Date();
    
    this.secGrup.duzTarih = tarih.getTime().toString();

    if (this.secGrup.key == null) {
      this.secGrup.kayTarih = tarih.getTime().toString();
      this.fbService.GrupEkle(this.secGrup).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Grup Eklendi";
      });
    }
    else {
      this.fbService.GrupDuzenle(this.secGrup).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Grup Düzenlendi";
      });
    }
  }
  Vazgec() {
    this.secGrup = new Grup();
    this.secGrup.key = null;
  }


}
