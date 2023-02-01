import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Korisnik } from 'src/app/models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  json_location = 'http://localhost:3000/korisnik';

  constructor(private _httpClient: HttpClient, private routes: Router) { }

  private _createUserFromObject(item: any) {
    return new Korisnik(item.id, item.username, item.password, item.mail);
  }


  public getNextId() {
    let max = 0;
    this.getAllUsers().subscribe(users => {
      users.forEach(curent => {
        if (curent.id > max) {
          max = curent.id;
        }
      });
      return max + 1;
    });
    return max;
  }


  public getUserByCredentials(username: string, password: string): Observable<Korisnik> {
    return this._httpClient.get<Korisnik[]>(`${this.json_location}?username=${username}&password=${password}`)
      .pipe(
        map((users: Korisnik[]) => {
          return users.find(user => user.username === username && user.password === password);
        }),
        map(item => this._createUserFromObject(item))
      );
  }


  public addUser(username: string, password: string, mail: string) {
    let toAdd = new Korisnik(this.getNextId(), username, password, mail);
    this._httpClient.post(this.json_location, toAdd).subscribe(
      (data: any) => {
        this._createUserFromObject(data)
      }
    );

    this.routes.navigate(['/ponuda']);
  }


  private getAllUsers(): Observable<Korisnik[]> {
    return this._httpClient.get<Korisnik[]>(this.json_location).pipe(
      map((items: any) => items.map((item: any) => this._createUserFromObject(item)))
    )
  }



}
