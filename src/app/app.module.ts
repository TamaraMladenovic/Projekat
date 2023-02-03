import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PonudaComponent } from './components/ponuda/ponuda.component';
import { RegistracijaComponent } from './components/registracija/registracija.component';
import { KorisnikoviSmestajeviComponent } from './components/korisnikovi-smestaji/korisnikovi-smestaji.component';
import { EditComponent } from './components/korisnikovi-smestaji/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PonudaComponent,
    RegistracijaComponent,
    KorisnikoviSmestajeviComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
