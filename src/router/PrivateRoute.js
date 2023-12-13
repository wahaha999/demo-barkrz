import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {

  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
            <Component {...props} />
        ) : (
            authed === false && (
                <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
            )
        )
      }
    />
  );
};

export default PrivateRoute;
