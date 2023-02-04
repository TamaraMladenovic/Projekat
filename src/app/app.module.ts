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
import { PretragaPipe } from './filter/pretraga.pipe';
import { OmiljenoComponent } from './components/omiljeno/omiljeno.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { StoreModule } from '@ngrx/store';
import { metaReducerLocalStorage, smestajReducer } from './state/smestaj.reducer';
import { DetaljiComponent } from './components/detalji/detalji.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PonudaComponent,
    RegistracijaComponent,
    KorisnikoviSmestajeviComponent,
    EditComponent,
    PretragaPipe,
    OmiljenoComponent,
    NavBarComponent,
    DetaljiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({omiljenoUnosi: smestajReducer}, {metaReducers: [metaReducerLocalStorage]})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
