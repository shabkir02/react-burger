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
  makeOrder, 
  ORDER_RESET, 
  SET_CURRENT_INGREDIENT, 
  SET_MODAL_INNER_INGREDIENT_DETAILS,
  SET_MODAL_INNER_ORDER_DETAILS,
  SET_MODAL_OPEN,
  SET_MODAL_CLOSE,
  SET_MODAL_INNER_ORDER_INFO,
  SET_CURRENT_ORDER_INFO,
  getUserInfo
} from '../../services/actions';

const App = () => {

  const ModalSwitch = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    let background = 
      history.action === "PUSH" && location.state && location.state.background;

    const { order, modalInner, isModalOpen, ingredients } = useSelector(store => ({
      order: store.order.order,
      modalInner: store.modal.modalInner,
      isModalOpen: store.modal.isModalOpen,
      ingredients: store.ingredients.ingredients,
    }));

    const modalInnerDetails = {
      ingredientDetails: 'ingredientDetails',
      orderDetails: 'orderDetails',
      orderInfo: 'orderInfo'
    }

    const handleIngredientClick = useCallback((item) => {
      dispatch({ type: SET_CURRENT_INGREDIENT, payload: item });
      dispatch({ type: SET_MODAL_INNER_INGREDIENT_DETAILS })
      // dispatch({ type: SET_MODAL_OPEN })
    }, [dispatch])

    const handleOrderClick = useCallback((finalIngredients) => {
      dispatch({ type: SET_MODAL_INNER_ORDER_DETAILS })
      dispatch({ type: SET_MODAL_OPEN })

      dispatch(makeOrder(finalIngredients))
    }, [dispatch])

    const handleOrderInfoClick = useCallback((item) => {
      dispatch({ type: SET_CURRENT_ORDER_INFO, payload: item });
      dispatch({ type: SET_MODAL_INNER_ORDER_INFO, payload: '#034533' });
      dispatch({ type: SET_MODAL_OPEN });
    }, [dispatch])

    const closeIngredientModal = useCallback(() => {
      history.replace({ pathname: '/', state: null })
    }, [history])

    const closeModal = useCallback(() => {
      dispatch({ type: SET_MODAL_CLOSE });
      dispatch({ type: ORDER_RESET });
    }, [dispatch])

    useEffect(() => {
      if (localStorage.getItem('refreshToken')) {
        dispatch(getUserInfo());
      }
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
      
    }, [dispatch])

    return (
          <>
            {isModalOpen && (
              <Modal closeModal={closeModal}>
                {/* {modalInner.type === modalInnerDetails.ingredientDetails && <IngredientDetails/>} */}
                {modalInner.type === modalInnerDetails.orderDetails && order && <OrderDetails/>}
                {modalInner.type === modalInnerDetails.orderInfo && <OrderInfo/>}
              </Modal>
            )}
            {background && (
              <Route path="/ingredients/:id" >
                <Modal closeModal={closeIngredientModal}>
                  {modalInner.type === modalInnerDetails.ingredientDetails && <IngredientDetails/>}
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
                  <IngredientItemPage ingredients={ingredients} />
                </WithAppHeader>
              </Route>

              <Route path="/feed/:id" >
                <WithAppHeader>
                  <OrderDetailsPage/>
                </WithAppHeader>
              </Route>

              <ProtectedRoute path="/profile/orders/:id">
                <WithAppHeader>
                  <OrderDetailsPage/>
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
