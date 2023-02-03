import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikoviSmestajeviComponent } from './korisnikovi-smestaji.component';

describe('KorisnikoviSmestajeviComponent', () => {
  let component: KorisnikoviSmestajeviComponent;
  let fixture: ComponentFixture<KorisnikoviSmestajeviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorisnikoviSmestajeviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KorisnikoviSmestajeviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
