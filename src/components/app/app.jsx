import React, { useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import WithAppHeader from '../../layouts/with-app-header/with-app-header';
import WithProfileNav from '../../layouts/with-profile-nav/with-profile-nav';
import ConstructorPage from '../../pages/constructor-page/constructor-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import OrdersPage from '../../pages/orders-page/orders-page';
import FeedPage from '../../pages/feed-page/feed-page';
import IngredientItemPage from '../../pages/ingredient-item-page/ingredient-item-page';
import OrderDetailsPage from '../../pages/order-details-page/order-details-page';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import OrderInfo from '../order-info/order-info';
import { ProtectedRoute } from '../../layouts/protected-route/protected-route';

import { 
  setCurrentIngredient,
  setModalInnerIngredientsDetails,
  setModalInnerOrderDetails,
  setModalInnerOrderInfo,
  setCurrentOrderInfo,

  makeOrder, 
  ORDER_RESET,
  getUserInfo,
  getIngredients,
  WS_ALL_ORDERS_CONNECTION_START
} from '../../services/actions';
import OrderInfoPage from '../../pages/order-info-page/order-info-page';

const App = () => {

  const ModalSwitch = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    let background = 
      history.action === "PUSH" && location.state && location.state.background;

    const { order, modalInner } = useSelector(store => ({
      order: store.order.order,
      modalInner: store.modal.modalInner
    }));

    const modalInnerDetails = {
      ingredientDetails: 'ingredientDetails',
      orderDetails: 'orderDetails',
      orderInfo: 'orderInfo'
    }

    const handleIngredientClick = useCallback((item) => {
      dispatch(setCurrentIngredient(item));
      dispatch(setModalInnerIngredientsDetails())
    }, [dispatch])

    const handleOrderClick = useCallback((finalIngredients, propLocation) => {
      dispatch(setModalInnerOrderDetails())
      console.log(propLocation);
      history.push({ pathname: '/order-details/4321', state: { background: propLocation }  })

      dispatch(makeOrder(finalIngredients))
    }, [dispatch])

    const handleOrderInfoClick = useCallback((item, ingredientsArr) => {
      dispatch(setCurrentOrderInfo({ order: item,  ingredientsArr}));
      dispatch(setModalInnerOrderInfo(`#${item.number}`));
    }, [dispatch])

    const closeModal = useCallback(() => {
      dispatch({ type: ORDER_RESET });
      history.goBack()
    }, [history, location])

    useEffect(() => {
      dispatch(getIngredients())

      if (localStorage.getItem('refreshToken')) {
        dispatch(getUserInfo());
      }

      dispatch({ type: WS_ALL_ORDERS_CONNECTION_START });
    }, [dispatch])

    useEffect(() => {

      const closeModalByEscape = (e) => {
          if (e.key === "Escape") {
              closeModal();
          }
      }

      document.addEventListener('keydown', closeModalByEscape)

      return () => {
          document.removeEventListener('keydown', closeModalByEscape)
      }
      
    }, [])

    return (
          <>
            {background && (
              <Route path="/:type/:id" >
                <Modal closeModal={closeModal}>
                  {modalInner.type === modalInnerDetails.ingredientDetails && <IngredientDetails/>}
                  {modalInner.type === modalInnerDetails.orderDetails && order && <OrderDetails/>}
                  {modalInner.type === modalInnerDetails.orderInfo && <OrderInfo/>}
                </Modal>
              </Route>
            )}
            <Switch location={background || location} >
              <Route path="/" exact >
                <WithAppHeader>
                  <ConstructorPage
                    handleIngredientClick={handleIngredientClick}
                    handleOrderClick={handleOrderClick}
                  />
                </WithAppHeader>
              </Route>

              <Route path="/ingredients/:id" >
                <WithAppHeader>
                  <IngredientItemPage />
                </WithAppHeader>
              </Route>

              <Route path="/feed/:id" >
                <WithAppHeader>
                  <OrderInfoPage />
                </WithAppHeader>
              </Route>

              <Route path="/order-details/:id" >
                <WithAppHeader>
                  <OrderDetailsPage/>
                </WithAppHeader>
              </Route>

              <ProtectedRoute path="/profile/orders/:id">
                <WithAppHeader>
                  <OrderInfoPage />
                </WithAppHeader>
              </ProtectedRoute>

              <Route path="/login" >
                <WithAppHeader>
                  <LoginPage/>
                </WithAppHeader>
              </Route>

              <Route path="/register" >
                <WithAppHeader>
                  <RegisterPage/>
                </WithAppHeader>
              </Route>

              <Route path="/feed" exact >
                <WithAppHeader>
                  <FeedPage handleOrderInfoClick={handleOrderInfoClick} />
                </WithAppHeader>
              </Route>

              <ProtectedRoute path="/profile" exact>
                <WithAppHeader>
                  <WithProfileNav>
                    <ProfilePage/>
                  </WithProfileNav>
                </WithAppHeader>
              </ProtectedRoute>

              <ProtectedRoute path="/profile/orders">
                <WithAppHeader>
                  <WithProfileNav>
                    <OrdersPage handleOrderInfoClick={handleOrderInfoClick} />
                  </WithProfileNav>
                </WithAppHeader>
              </ProtectedRoute>

              <Route path="/forgot-password" >
                <WithAppHeader>
                  <ForgotPasswordPage/>
                </WithAppHeader>
              </Route>

              <Route path="/reset-password" >
                <WithAppHeader>
                  <ResetPasswordPage/>
                </WithAppHeader>
              </Route>

            </Switch>
          </>
    );
  }

  return (
    <Router>
      <ModalSwitch />
    </Router>
  )
}

export default App;
