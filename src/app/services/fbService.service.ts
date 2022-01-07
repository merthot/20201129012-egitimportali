import { Grup } from './../models/grup';
import { Ders } from 'src/app/models/ders';
import { Uye } from './../models/uye';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  private dbDers = '/Dersler'
  private dbUye = '/Uyeler';
  private dbGrup = '/Gruplar';

  dersRef: AngularFireList<Ders> = null;
  uyeRef: AngularFireList<Uye> = null;
  grupRef: AngularFireList<Grup> = null;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) {
    this.dersRef = db.list(this.dbDers);
    this.uyeRef = db.list(this.dbUye);
    this.grupRef = db.list(this.dbGrup);
  }


  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }
  OturumKapat() {
    return this.afAuth.signOut();
  }
  OturumKontrol() {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  }
  UyeOl(uye: Uye) {
    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola);
  }

  UyeEkle(uye: Uye) {
    return this.uyeRef.push(uye);
  }


  /* Ders Tablosu Servisleri  Başlangıç */
  DersListele() {
    return this.dersRef;
  }
  DersListeleByUID(uid: string) {
    return this.db.list("/Dersler", q => q.orderByChild("uid").equalTo(uid));
  }
  DersByKey(key: string) {
    return this.db.object("/Dersler/" + key);
  }
  DersEkle(ders: Ders) {
    return this.dersRef.push(ders);
  }
  DersDuzenle(ders: Ders) {
    return this.dersRef.update(ders.key, ders);
  }
  DersSil(key: string) {
    return this.dersRef.remove(key);
  }

  /* Ders Tablosu Servisleri  Bitiş */

  UyeListele() {
    return this.uyeRef;
  }
  UyeDuzenle(k: Uye) {
    return this.uyeRef.update(k.key, k);
  }
  UyeSil(key: string) {
    return this.uyeRef.remove(key);
  }

  /* Grup Tablosu Servisleri  Başlangıç */

  GrupListele() {
    return this.grupRef;
  }
  GrupEkle(grup: Grup) {
    return this.grupRef.push(grup);
  }
  GrupDuzenle(grup: Grup) {
    return this.grupRef.update(grup.key, grup);
  }
  GrupSil(key: string) {
    return this.grupRef.remove(key);
  }  

    /* Grup Tablosu Servisleri  Bitiş */

}
