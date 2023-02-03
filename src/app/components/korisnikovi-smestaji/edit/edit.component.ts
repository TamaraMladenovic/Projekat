import { Component, Input, OnInit } from '@angular/core';
import { Smestaj } from 'src/app/models/smestaj';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SmestajService } from 'src/app/servisi/smestaj-servis/smestaj.service';
import { AutentifikacijaService } from 'src/app/servisi/autentifikacija/autentifikacija.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public registerForm: FormGroup;
  @Input() smestaj: Smestaj;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private _productService: SmestajService, private _authenticationService: AutentifikacijaService, private routes: Router) {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this._productService.getSmestaj(id).subscribe((item) => {
        if (item) {
          this.smestaj = new Smestaj(item.id, item.naziv, item.grad, item.adresa, item.cena, item.slika, item.korisnik, item.opis);
          this.initForms();
        }
      });
    });

  }

  ngOnInit(): void {

  }




  public initForms() {

    this.registerForm = new FormGroup({
      quickFix : new FormControl(this.smestaj.naziv,[
        Validators.required
      ]),
      naziv : new FormControl(this.smestaj.naziv,[
        Validators.required
      ]),
      grad : new FormControl(this.smestaj.grad,[
        Validators.required
      ]),
      adresa : new FormControl(this.smestaj.adresa,[
        Validators.required
      ]),
      cena : new FormControl(this.smestaj.cena,[
        Validators.required
      ]),
      opis : new FormControl(this.smestaj.opis,[
        Validators.required
      ]),
      slika : new FormControl(this.smestaj.slika,[
        Validators.required
      ]),

    })

  }

  public submitForm() {
    if (!this.registerForm.valid) {
      Swal.fire({
        title: 'Error!',
        text: "All fields must have at least 3 characters",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#018281'
      });
    }
    else {
      let newSmestaj = new Smestaj(
        this.smestaj.id,
        this.registerForm.get("naziv")?.value,
        this.registerForm.get("grad")?.value,
        this.registerForm.get("adresa")?.value,
        this.registerForm.get("cena")?.value,
        this.registerForm.get("slika")?.value,
        this.smestaj.korisnik,
        this.registerForm.get("opis")?.value        
      );
      this._productService.updateSmestaj(newSmestaj).subscribe(
        (response) => {
          Swal.fire({
            title: 'Success!',
            text: "Product updated successfully",
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#018281'
          });
          this.routes.navigate(["/edit"]);
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: "An error occurred while updating the product",
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#018281'
          });
        }
      );
    }
  }

}