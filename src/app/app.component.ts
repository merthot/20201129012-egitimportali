import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FbservisService } from './services/fbService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eğitim Portalı';

constructor(
  public fbService: FbservisService,
  public router: Router
){}

OturumKapat() {
  this.fbService.OturumKapat().then(d => {
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  });

}

}

