import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import WithAppHeader from '../../layouts/with-app-header';
import ConstructorPage from '../../pages/constructor-page/constructor-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import FeedPage from '../../pages/feed-page/feed-page';

const App = () => {

  return (
    <Router>
      <Switch>

        <Route path="/" exact >
          <WithAppHeader>
            <ConstructorPage/>
          </WithAppHeader>
        </Route>

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

        <Route path="/profile" >
          <WithAppHeader>
            <ProfilePage/>
          </WithAppHeader>
        </Route>

        <Route path="/feed" >
          <WithAppHeader>
            <FeedPage/>
          </WithAppHeader>
        </Route>

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
    </Router>
  );
}

export default App;
