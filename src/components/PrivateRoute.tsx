import React from "react";
import { Route } from "react-router";
import { Redirect } from "react-router-dom";
import { AdminPageProps } from "../definitions/ICloud";
import AuthService from "../services/AuthService";

const PrivateRoute: React.FC<AdminPageProps> = ({
  componentToRender: ComponentToRender,
  clouds,
  deleteHandler,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        AuthService.isAuthenticated() ? (
          <ComponentToRender
            {...props}
            clouds={clouds}
            deleteHandler={deleteHandler}
          />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
