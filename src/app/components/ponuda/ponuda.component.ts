import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Smestaj } from 'src/app/models/smestaj';
import { AutentifikacijaService } from 'src/app/servisi/autentifikacija/autentifikacija.service';
import { KorisnikService } from 'src/app/servisi/korisnik-servis/korisnik-servis.service';
import { SmestajService } from 'src/app/servisi/smestaj-servis/smestaj.service';
import { addOmiljeno } from 'src/app/state/smestaj.actions';
import { omiljeno, smestajReducer } from 'src/app/state/smestaj.reducer';
import { selectSveOmiljeno } from 'src/app/state/smestaj.selector';

@Component({
  selector: 'app-ponuda',
  templateUrl: './ponuda.component.html',
  styleUrls: ['./ponuda.component.scss']
})
export class PonudaComponent implements OnInit {

  public smestajData!: Smestaj[]
  @Input() searchText: any;
  @Input() smestaj: Smestaj;

  constructor(private _smestajService: SmestajService, private aut: AutentifikacijaService, private store: Store) {
    this._smestajService.getByNotUserId(aut.korisnik.id).subscribe((data) => {
      console.log(data)
      this.smestajData = data;
    });
  }

  ngOnInit(): void {
  }

  dodajOmiljeno(smestaj: Smestaj) {
    let om = true;

    this.store.select(selectSveOmiljeno).forEach(item => {
      if (item.find(u => u.naziv == smestaj.naziv)
        && item.find(u => u.grad == smestaj.grad)
        && item.find(u => u.adresa == smestaj.adresa)
        && item.find(u => u.opis == smestaj.opis)) {

        om = false;
      }
    });

    if (om) {
      this.store.dispatch(addOmiljeno(smestaj));
    } 
  }

}
