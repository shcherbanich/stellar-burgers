import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';
import {
  ConstructorPage,
  Profile,
  ProfileOrders,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Feed,
  NotFound404
} from '@pages';
import {
  ProtectedRoute,
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo
} from '@components';
import {
  closeModal,
  init,
  fetchFeed,
  fetchIngredients,
  getUserThunk,
  selectIngredients,
  selectIsAuthenticated,
  selectIsModalOpened,
  selectOrders
} from '../../services';
import { deleteCookie, getCookie } from '../../utils/cookie';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const App = () => {
  const dispatch = useAppDispatch();
  const token = getCookie('accessToken');
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const ingredients = useAppSelector(selectIngredients);
  const feed = useAppSelector(selectOrders);
  const isModalOpened = useAppSelector(selectIsModalOpened);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated && token) {
      dispatch(getUserThunk())
        .unwrap()
        .then(() => {
          dispatch(init());
        })
        .catch((e) => {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        });
    } else {
      dispatch(init());
    }
  }, []);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, []);

  useEffect(() => {
    if (!feed.length) {
      dispatch(fetchFeed());
    }
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute unAuthOnly>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute unAuthOnly>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute unAuthOnly>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute unAuthOnly>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
      </Routes>

      {isModalOpened && backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Описание ингредиента'}
                onClose={() => {
                  dispatch(closeModal());
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={'Заказ'}
                  onClose={() => {
                    dispatch(closeModal());
                  }}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={'Заказ'}
                onClose={() => {
                  dispatch(closeModal());
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
