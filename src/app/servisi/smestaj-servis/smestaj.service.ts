import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Smestaj } from 'src/app/models/smestaj'

@Injectable({
  providedIn: 'root'
})
export class SmestajService {

  json_locatio = 'http://localhost:3000/smestaj';

  constructor(private _httpClient: HttpClient, private routes: Router) { }

  public getNextId() {
    let max = 0;
    this.getAllsmestaj().subscribe(users => {
      users.forEach(curent => {
        if (curent.id > max) {
          max = curent.id;

        }
      });
      return max + 1;
    });
    return max;
  }


  private _createSmestajFromObject(item: any) {
    return new Smestaj(item.id, item.naziv, item.grad, item.adresa, item.cena, item.slika, item.korisnik, item.opis);
  }

  public getAllsmestaj(): Observable<Smestaj[]> {
    return this._httpClient.get<Smestaj[]>(this.json_locatio).pipe(
      map((data: any[]) => data.map((item: any) => this._createSmestajFromObject(item)))
    );
  }

  public getSmestaj(id: Number): Observable<Smestaj> {
    return this._httpClient.get<Smestaj>(this.json_locatio + "/" + id).pipe(
      map((data: Smestaj) => this._createSmestajFromObject(data))
    );
  }

  public deleteSmestaj(id: Number) {
    this._httpClient.delete(this.json_locatio + "/" + id).subscribe(
      (data: any)=>{
        this._createSmestajFromObject(data);
      }
      );
  }

  public createSmestaj(smestaj: Smestaj) {
    smestaj.id = this.getNextId();
     this._httpClient.post(this.json_locatio, smestaj).subscribe(
    (data: any)=>{
      this._createSmestajFromObject(data);
    }
    );
  }

  public getByUserId(userId: number): Observable<Smestaj[]> {
    return this._httpClient.get<Smestaj[]>(`${this.json_locatio}?korisnik=${userId}`).pipe(
      map((products: Smestaj[]) => {
        return products.filter(product => product.korisnik == userId);
      }),
      map(items => items.map(item =>
        this._createSmestajFromObject(item)))
    );
  }

  public updateSmestaj(smestaj: Smestaj): Observable<Smestaj> {
    return this._httpClient.put(this.json_locatio + "/" + smestaj.id, smestaj).pipe(
      map((data: any) => this._createSmestajFromObject(data))
    );
  }

}
