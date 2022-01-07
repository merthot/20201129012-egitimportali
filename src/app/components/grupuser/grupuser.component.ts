import { Router } from '@angular/router';
import { FbservisService } from 'src/app/services/fbService.service';
import { Grup } from './../../models/grup';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { Sonuc } from 'src/app/models/sonuc';

@Component({
  selector: 'app-grupuser',
  templateUrl: './grupuser.component.html',
  styleUrls: ['./grupuser.component.css']
})
export class GrupuserComponent implements OnInit {
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
}
