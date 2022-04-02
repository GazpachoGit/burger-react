import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import { ActionCreator } from 'redux';
import { AppDispatch, RootState, AppThunk } from './types';

export const useDispatch = () => dispatchHook<AppDispatch | ActionCreator<AppThunk>>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;