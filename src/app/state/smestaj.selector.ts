import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Smestaj } from "../models/smestaj";

export const selectSveOmiljeno = createSelector(
    createFeatureSelector('omiljenoUnosi'), (state: Smestaj[]) => {
        return state;
    }
);

export const selectBrojOmiljenih = createSelector(
    createFeatureSelector('omiljenoUnosi'), (state: Smestaj[]) => {
        return state.length;
    }
);