import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutentifikacijaService } from 'src/app/servisi/autentifikacija/autentifikacija.service';
import { KorisnikService } from 'src/app/servisi/korisnik-servis/korisnik-servis.service';
import Swal from 'sweetalert2';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userForm!: FormGroup;
  regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;



  constructor(private authService: AutentifikacijaService, private _userService: KorisnikService, private router: Router) {
    this.initForms();
  }

  ngOnInit(): void {

  }

  public initForms() {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      korisnicko: new FormControl('', [Validators.required, Validators.minLength(3)]),
      sifra: new FormControl('', [Validators.required, Validators.minLength(4)]),
      mail: new FormControl("", [Validators.required, Validators.pattern(this.regex)])

    })
  }

  public submitForm() {

    if (!this.userForm.valid) {
      if (!this.userForm.controls["username"].valid) {
        Swal.fire({
          title: 'Error!',
          text: "Username mora da ima najmanje 3 karaktera",
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#D0F9F7'
        }
        );
      } else if (!this.userForm.controls["password"].valid) {
        Swal.fire({
          title: 'Error!',
          text: "Password mora da ima najmanje 4 karaktera",
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#D0F9F7'
        }
        );
      }
    } else {

      let username = this.userForm.get('username')!.value;
      let password = this.userForm.get('password')!.value;

      this._userService.getUserByCredentials(username, password)
        .pipe(catchError(err => {
          Swal.fire({
            title: 'Error!',
            text: "Pokusajte ponovo!!!",
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#D0F9F7'
          }
          )
          return of(null);
        }))
        .subscribe((data) => {
          if (data) {
            this.authService.login(data);
            this.router.navigate(['/ponuda']);
          }
        });
    }
  }

  public onSubmit() {
    if (!this.userForm.valid) {
      if (!this.userForm.controls["korisnicko"].valid) {
        Swal.fire({
          title: 'Error!',
          text: "Username mora da ima najmanje 3 karaktera!!!",
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#018281'
        });


      } else if (!this.userForm.controls["sifra"].valid) {
        Swal.fire({
          title: 'Error!',
          text: "Password mora da sadrzi najmanje 4 karaktera!!!",
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#018281'
        });
      } 
    } else {
      let username = this.userForm.get("korisnicko")!.value;
      let password = this.userForm.get("sifra")!.value;
      let mail = this.userForm.get("mail")!.value;

      this._userService.addUser(username, password, mail);
    }
  }


}
