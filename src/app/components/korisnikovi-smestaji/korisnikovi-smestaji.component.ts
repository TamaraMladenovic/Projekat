import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Smestaj } from 'src/app/models/smestaj';
import { AutentifikacijaService } from 'src/app/servisi/autentifikacija/autentifikacija.service';
import { SmestajService } from 'src/app/servisi/smestaj-servis/smestaj.service';

@Component({
  selector: 'app-korisnikovi-smestajevi',
  templateUrl: './korisnikovi-smestaji.component.html',
  styleUrls: ['./korisnikovi-smestaji.component.scss']
})
export class KorisnikoviSmestajeviComponent {

  formValue !: FormGroup;
  smestaj!:Smestaj;


  smestajData !: Smestaj[];
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formBuilder: FormBuilder, private servis: SmestajService, private aut: AutentifikacijaService, private routes: Router) {
    this.getSmestajKorisnik(this.aut.korisnik.id);
    this.formValue = this.formBuilder.group({
      naziv: [''],
      grad: [''],
      adresa: [''],
      cena: [''],
      opis: [''],
      slika: ['']
    })

  }


  ngOnInit(): void {
    
  }

  clickDodajSmestaj() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postDetaljiSmestaja() {

    let naziv = this.formValue.get('naziv')?.value;
    let grad = this.formValue.get('grad')?.value;
    let adresa = this.formValue.get('adresa')?.value;
    let cena = this.formValue.get('cena')?.value;
    let opis = this.formValue.get('opis')?.value;
    let slika = this.formValue.get('slika')?.value;
    let korisnik = this.aut.korisnik.id;
    let sm = new Smestaj(0,naziv,grad,adresa,cena,slika,korisnik,opis);
    this.servis.createSmestaj(sm);
    this.getSmestajKorisnik(this.aut.korisnik.id);
  }

  getSmestajKorisnik(id: number) {
    this.servis.getByUserId(id).subscribe((data) => {
      this.smestajData = data;
      console.log(data);
    })
  }

  deleteSmestaj(row: any) {
    this.servis.deleteSmestaj(row.id);
    this.getSmestajKorisnik(this.aut.korisnik.id);
  }
 

}
