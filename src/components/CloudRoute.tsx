import React from "react";
import { Route } from "react-router";
import { CustomRouteProps } from "../definitions/ICloud";

const CloudRoute: React.FC<CustomRouteProps> = ({
  componentToRender: ComponentToRender,
  ...rest
}) => {
  return <Route {...rest} render={props => <ComponentToRender {...props} />} />;
};

export default CloudRoute;
