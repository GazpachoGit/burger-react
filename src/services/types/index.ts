import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { store } from '../store';
import { TIngredientsActions } from '../actions/index';
import { TAuthActions } from '../actions/auth';
import { TWSActions } from '../actions/wsActions';

export type TApplicationActions = TIngredientsActions | TAuthActions | TWSActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = Dispatch<TApplicationActions>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions> | ActionCreator<ThunkAction<ReturnType, RootState, unknown, TApplicationActions>>;