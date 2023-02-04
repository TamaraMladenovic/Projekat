import { Component } from '@angular/core';
import { AutentifikacijaService } from '../servisi/autentifikacija/autentifikacija.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(private aut: AutentifikacijaService){

  }
  logaut(){
    this.aut.logout();
  }
}
