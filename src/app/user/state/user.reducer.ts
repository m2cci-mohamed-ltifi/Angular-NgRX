import { createAction, createReducer, on } from "@ngrx/store";
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

export const userReducer = createReducer(initialState, on(createAction("toggleMaskUser"), state => {
    return {...state, maskUserName:!state.maskUserName}
}))