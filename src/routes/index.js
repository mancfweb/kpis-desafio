import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';

import SignInPage from '../pages/SignIn';
import SignUpPage from '../pages/SignUp';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignInPage} />
      <Route path="/signup" exact component={SignUpPage} />
      {/* <Route path="/dashboard" exact component={PartiesPage} /> */}
    </Switch>
  );
}
