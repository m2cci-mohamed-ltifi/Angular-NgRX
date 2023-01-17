import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { cpuUsage } from "process";
import * as AppState from '../../state/app.state';


export interface State extends AppState.State{
    users:UserState
}
export interface UserState{
    userName:string,
    maskUserName:boolean
}

const initialState: UserState ={
    userName:null, 
    maskUserName:false
};

export const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(getUserFeatureState, state => state.maskUserName);
export const userReducer = createReducer(initialState, on(createAction("toggleMaskUser"), state => {
    return {...state, maskUserName:!state.maskUserName}
}))