import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import budgetingReducer from '../components/budgeting/budgetingSlice';

export const store = configureStore({
  reducer: {
    budgeting: budgetingReducer,
  },
  devTools:true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
