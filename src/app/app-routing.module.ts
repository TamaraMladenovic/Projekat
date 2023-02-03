import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './components/korisnikovi-smestaji/edit/edit.component';
import { KorisnikoviSmestajeviComponent } from './components/korisnikovi-smestaji/korisnikovi-smestaji.component';
import { LoginComponent } from './components/login/login.component';
import { PonudaComponent } from './components/ponuda/ponuda.component';
import { RegistracijaComponent } from './components/registracija/registracija.component';
import { AutentifikacijaService } from './servisi/autentifikacija/autentifikacija.service';

const routes: Routes = [
  { path: 'ponuda', component: PonudaComponent,canActivate: [AutentifikacijaService] },
  { path: 'reg', component: RegistracijaComponent },
  { path: 'edit', component: KorisnikoviSmestajeviComponent,canActivate: [AutentifikacijaService] },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'editovanje/:id', component: EditComponent,canActivate: [AutentifikacijaService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
