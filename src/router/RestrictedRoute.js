import React from 'react';
import { Redirect, Route } from 'react-router-dom';

/**
 * Restricted Route is the route which allows user only
 * when he is not authenticated.
 * As like Login Page.
 * In this case , they are login and forgot password page.
 * After authentication he should not able to go login page again.
 *  */
const RestrictedRoute = ({ component: Component, authed, ...rest }) => {

  return (
    <Route
      {...rest}
      render={(props) => {
        return authed === false ? (
            <Component {...props} />
        ) : authed === true ? (
            <Redirect to={{ pathname: '/petsList', state: { from: props.location } }} />
        ) : (
            <></>
        )
      }}
    />
  );
};

export default RestrictedRoute;
