import { RootState } from '../store';

export const selectIngredients = (state: RootState) =>
  state.stellarBurger.ingredients;
export const selectLoading = (state: RootState) => state.stellarBurger.loading;
export const selectOrderModalData = (state: RootState) =>
  state.stellarBurger.orderModalData;
export const selectConstructorItems = (state: RootState) =>
  state.stellarBurger.constructorItems;
export const selectOrderRequest = (state: RootState) =>
  state.stellarBurger.orderRequest;
export const selectUser = (state: RootState) => state.stellarBurger.user;
export const selectOrders = (state: RootState) => state.stellarBurger.orders;
export const selectTotalOrders = (state: RootState) =>
  state.stellarBurger.totalOrders;
export const selectTodayOrders = (state: RootState) =>
  state.stellarBurger.ordersToday;
export const selectUserOrders = (state: RootState) =>
  state.stellarBurger.userOrders;
export const selectIsAuthenticated = (state: RootState) =>
  state.stellarBurger.isAuthenticated;
export const selectIsInit = (state: RootState) => state.stellarBurger.isInit;
export const selectIsModalOpened = (state: RootState) =>
  state.stellarBurger.isModalOpened;
export const selectErrorText = (state: RootState) =>
  state.stellarBurger.errorText;
