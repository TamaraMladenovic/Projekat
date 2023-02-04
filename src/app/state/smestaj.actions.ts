import { createAction, props } from "@ngrx/store";
import { Smestaj } from "../models/smestaj";

export const addOmiljeno = createAction('Dodaj rezervaciju', props<Smestaj>());
export const deleteOmiljeno = createAction('Izbrisi rezervaciju', props<Smestaj>());