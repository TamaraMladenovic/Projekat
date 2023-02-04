import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { Smestaj } from 'src/app/models/smestaj';
import { KorisnikService } from 'src/app/servisi/korisnik-servis/korisnik-servis.service';
import { SmestajService } from 'src/app/servisi/smestaj-servis/smestaj.service';

@Component({
  selector: 'app-detalji',
  templateUrl: './detalji.component.html',
  styleUrls: ['./detalji.component.scss']
})
export class DetaljiComponent  implements OnInit{
  constructor(private smestajS: SmestajService, private korisnikS: KorisnikService, private route: ActivatedRoute) { }

  public smestaj!: Smestaj;
  public korisnik!: Korisnik;

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      let id = params['id'];
      this.smestajS.getSmestaj(id).subscribe((item)=>{
        this.smestaj = new Smestaj (item.id, item.naziv, item.grad, item.adresa, item.cena, item.slika, item.korisnik, item.opis);
        this.korisnikS.getUser(item.korisnik).subscribe((data) =>{
          this.korisnik = new Korisnik(data.id, data.username, data.password, data.mail);
        })
      });
    });
  }
}
