import React from "react";
import { IonTitle } from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";

const PageNotFound: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <IonTitle color="tertiary">Page '{location.pathname}' Not Found</IonTitle>
    </>
  );
};

export default PageNotFound;
