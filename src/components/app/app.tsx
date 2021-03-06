import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/hooks';

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
import AppHeader from '../app-header/app-header';
import { ProtectedRoute } from '../../layouts/protected-route/protected-route';

import { wsAllOrdersConnectionStart } from '../../services/actions/wsOrders/wsOrders';

import { getOrderRequest, orderReset} from '../../services/actions/order/order';
import { getUserInfoRequest } from '../../services/actions/user/user';
import { TIngredient, TOrder } from '../../services/types/data';

import { 
  setCurrentIngredient, 
  setModalInnerIngredientsDetails, 
  setModalInnerOrderDetails, 
  setModalInnerOrderInfo, 
  setCurrentOrderInfo 
} from '../../services/actions/modal/modal';
import OrderInfoPage from '../../pages/order-info-page/order-info-page';
import { getIngredientsRequest } from '../../services/actions/ingredients/ingredients';

export interface IAppLocation {
  background?: {
      key: string,
      pathname: string,
      search: string,
      hash: string
      state: IAppLocation
  }
};

const App = () => {

  const ModalSwitch = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<IAppLocation>();

    let background = 
      history.action === "PUSH" && location.state && location.state.background;

    const { modalInner } = useSelector(store => ({
      modalInner: store.modal.modalInner
    }));

    const modalInnerDetails = {
      ingredientDetails: 'ingredientDetails',
      orderDetails: 'orderDetails',
      orderInfo: 'orderInfo'
    }

    const handleIngredientClick = (item: TIngredient): void => {
      dispatch(setCurrentIngredient(item));
      dispatch(setModalInnerIngredientsDetails())
    }

    const handleOrderClick = (propLocation: object): void => {
      dispatch(setModalInnerOrderDetails())
      history.push({ pathname: '/order-details/4321', state: { background: propLocation }  })

      dispatch(getOrderRequest())
    }

    const handleOrderInfoClick = (order: TOrder, ingredientsArr: ReadonlyArray<TIngredient>): void => {
      dispatch(setCurrentOrderInfo({ order, ingredientsArr}));
      dispatch(setModalInnerOrderInfo(`#${order.number}`));
    }

    const closeModal = (): void => {
      dispatch(orderReset());
      history.goBack()
    }

    useEffect(() => {
      dispatch(getIngredientsRequest())

      if (localStorage.getItem('refreshToken')) {
        dispatch(getUserInfoRequest());
      }

      dispatch(wsAllOrdersConnectionStart());
    }, [dispatch])

    useEffect(() => {

      const closeModalByEscape = (e: KeyboardEvent ): void => {
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
                  {modalInner?.type === modalInnerDetails.ingredientDetails && <IngredientDetails/>}
                  {modalInner?.type === modalInnerDetails.orderDetails && <OrderDetails/>}
                  {modalInner?.type === modalInnerDetails.orderInfo && <OrderInfo/>}
                </Modal>
              </Route>
            )}

            <AppHeader />

            <Switch location={background || location} >
              <Route path="/" exact >
                <ConstructorPage
                  handleIngredientClick={handleIngredientClick}
                  handleOrderClick={handleOrderClick}
                />
              </Route>

              <Route path="/ingredients/:id" >
                <IngredientItemPage />
              </Route>

              <Route path="/feed/:id" >
                <OrderInfoPage />
              </Route>

              <Route path="/order-details/:id" >
                <OrderDetailsPage/>
              </Route>

              <ProtectedRoute path="/profile/orders/:id">
                <OrderInfoPage />
              </ProtectedRoute>

              <Route path="/login" >
                <LoginPage/>
              </Route>

              <Route path="/register" >
                <RegisterPage/>
              </Route>

              <Route path="/feed" exact >
                <FeedPage handleOrderInfoClick={handleOrderInfoClick} />
              </Route>

              <ProtectedRoute path="/profile" exact>
                <WithProfileNav>
                  <ProfilePage/>
                </WithProfileNav>
              </ProtectedRoute>

              <ProtectedRoute path="/profile/orders">
                <WithProfileNav>
                  <OrdersPage handleOrderInfoClick={handleOrderInfoClick} />
                </WithProfileNav>
              </ProtectedRoute>

              <Route path="/forgot-password" >
                <ForgotPasswordPage/>
              </Route>

              <Route path="/reset-password" >
                <ResetPasswordPage/>
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
