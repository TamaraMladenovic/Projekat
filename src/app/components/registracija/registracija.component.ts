import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { KorisnikService } from 'src/app/servisi/korisnik-servis/korisnik-servis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss']
})
export class RegistracijaComponent implements OnInit {

  public registerForm!: FormGroup;
  regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


  constructor(private _userService: KorisnikService) {
    this.initForms();
  }

  ngOnInit(): void {
  }

  public MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceValue = control.get(source);
      const targetValue = control.get(target);

      if (sourceValue !== targetValue) {

        return { mismatch: true };
      } else {
        return null;
      }
    };
  }


  public initForms() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required, Validators.minLength(3)
      ]),
      password: new FormControl('', [
        Validators.required, Validators.minLength(4)
      ]),
      mail: new FormControl('', [
        Validators.required, Validators.email
      ])
    });
  }

  public submitForm() {
    if (!this.registerForm.valid) {
      if (!this.registerForm.controls["username"].valid) {
        Swal.fire({
          title: 'Error!',
          text: "Username must have at least 3 caracters!!!",
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#018281'
        });


      } else if (!this.registerForm.controls["password"].valid) {
        Swal.fire({
          title: 'Error!',
          text: "Password musst contain at least 4 caracters!!!",
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#018281'
        });
      } else if (!this.registerForm.controls["mail"].valid) {
        Swal.fire({
          title: 'Error!',
          text: "Enter a valid phone number!!!",
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#018281'
        });
      } 
    }

    else {


      let username = this.registerForm.get("username")!.value;
      let password = this.registerForm.get("password")!.value;
      let mail = this.registerForm.get("mail")!.value;
    
      this._userService.addUser(username, password, mail);
    }
  }

}
