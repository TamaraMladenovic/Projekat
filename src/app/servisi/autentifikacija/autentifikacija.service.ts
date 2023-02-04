import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Korisnik } from 'src/app/models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class AutentifikacijaService implements CanActivate {


  korisnik!: Korisnik;
  isLoggedIn = false;

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.isLoggedIn) {
      return this.router.navigate(['/']);
    } else {
      return true;
    }
  }

  login(korisnik: Korisnik) {
    this.korisnik = korisnik;
    this.isLoggedIn = true;
    this.router.navigate(['/ponuda']);

  }

  logout() {
    this.isLoggedIn = false;
    this.korisnik = ({
      id: 0, username: "",
      password: "",
      mail: ""
    });
    this.router.navigate(['/']);
  }
}
