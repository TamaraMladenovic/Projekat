import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmiljenoComponent } from './omiljeno.component';

describe('OmiljenoComponent', () => {
  let component: OmiljenoComponent;
  let fixture: ComponentFixture<OmiljenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmiljenoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmiljenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
