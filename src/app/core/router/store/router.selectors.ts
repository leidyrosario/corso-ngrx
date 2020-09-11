import { AppState } from "./../../core.module";
import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

export const getRouter = createFeatureSelector<AppState, RouterReducerState>('router');
