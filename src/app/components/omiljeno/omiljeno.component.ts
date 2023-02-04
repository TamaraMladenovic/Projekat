import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Smestaj } from 'src/app/models/smestaj';
import { deleteOmiljeno } from 'src/app/state/smestaj.actions';
import { selectSveOmiljeno } from 'src/app/state/smestaj.selector';

@Component({
  selector: 'app-omiljeno',
  templateUrl: './omiljeno.component.html',
  styleUrls: ['./omiljeno.component.scss']
})
export class OmiljenoComponent {
  omiljenoUnosi$: Observable<any>;

  constructor(private store: Store){
    this.omiljenoUnosi$ = store.select(selectSveOmiljeno);
  }

  izbrisiOmiljeno(smestaj: Smestaj){
    this.store.dispatch(deleteOmiljeno(smestaj));
  }
}
