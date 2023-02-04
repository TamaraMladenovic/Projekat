import { Injectable } from "@angular/core";
import { createReducer, on, ActionReducer, INIT, UPDATE } from "@ngrx/store";
import { Smestaj } from "../models/smestaj";
import { addOmiljeno, deleteOmiljeno } from "./smestaj.actions";

export const omiljeno: Smestaj[] = [];

export const smestajReducer = createReducer(omiljeno, on(addOmiljeno, (rez, unos) => {
    const omiljenoKopija: Smestaj[] = JSON.parse(JSON.stringify(rez));
    omiljenoKopija.push(unos);
    return omiljenoKopija;
}), on(deleteOmiljeno, (rez, unos) => {
    const omiljenoKopija: Smestaj[] = JSON.parse(JSON.stringify(rez));
    const found = omiljenoKopija.find(u => u.naziv == unos.naziv);
    if(found){
        omiljenoKopija.splice(omiljenoKopija.indexOf(found), 1);
    }

    return omiljenoKopija;
})

);

export const metaReducerLocalStorage = (reducer: ActionReducer<any>): ActionReducer<any> => {
    return (state, action) => {
        if(action.type === INIT || action.type == UPDATE){
            const storageValue = localStorage.getItem("state");
            if(storageValue){
                try{
                    return JSON.parse(storageValue);
                } catch {
                    localStorage.removeItem("state");
                }
            }
        }

        const nextState = reducer(state, action);
        localStorage.setItem("state", JSON.stringify(nextState));
        return nextState;
    };
}