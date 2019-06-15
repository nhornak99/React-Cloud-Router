import React, { useState, useEffect } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton
} from "@ionic/react";
import Cloud from "./components/Cloud";
import "./styles/_app.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  NavLink
} from "react-router-dom";
import Home from "./components/Home";
import CloudForm from "./components/CloudForm";
import PageNotFound from "./components/PageNotFound";
import CloudRoute from "./components/CloudRoute";
import AuthService from "./services/AuthService";
import { ICloud } from "./definitions/ICloud";
import PrivateRoute from "./components/PrivateRoute";
import Admin from "./components/Admin";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const cloudCollection: ICloud[] = [
  {
    type: "Stratus",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Close_Cirrostratus.jpg/250px-Close_Cirrostratus.jpg"
  },
  {
    type: "Cirrus",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Cirrus_clouds2.jpg/220px-Cirrus_clouds2.jpg"
  }
];

const App: React.FC = () => {
  const [clouds, setClouds] = useState(cloudCollection);
  const [isLoggedIn, setLoginStatus] = useState(true);

  const addCloud = (e: Event, newCloud: ICloud) => {
    e.preventDefault();
    cloudCollection.push(newCloud);
    setClouds(cloudCollection);
  };

  const deleteCloud = (e: Event, cloud: string) => {
    const cloudToDelete = cloudCollection.find(x => x.type === cloud);
    if (cloudToDelete)
      setClouds(cloudCollection.filter(x => x.type !== cloudToDelete.type));
  };

  const signIn = () => {
    AuthService.signIn();
    setLoginStatus(AuthService.isAuthenticated());
  };

  const signOut = () => {
    AuthService.signOut();
    setLoginStatus(AuthService.isAuthenticated());
  };

  const LogoutButton: React.SFC = () => (
    <IonButton color="secondary" onClick={() => signOut()}>
      Logout
    </IonButton>
  );

  const LoginButton: React.SFC = () => (
    <IonButton
      class="ion-padding-end"
      color="secondary"
      onClick={() => signIn()}
    >
      Login
    </IonButton>
  );

  return (
    <Router>
      <div className="App">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle slot="start">WET CLOUDS</IonTitle>
            <IonButtons slot="end">
              {isLoggedIn ? <LogoutButton /> : <LoginButton />}
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonList id="navigation">
          <NavLink to="/" className="navigation-link">
            <IonItem detail>
              <IonLabel>Home</IonLabel>
            </IonItem>
          </NavLink>
          <NavLink to="/clouds" className="navigation-link">
            <IonItem detail>
              <IonLabel>Clouds</IonLabel>
            </IonItem>
          </NavLink>
          <NavLink to="/add" className="navigation-link">
            <IonItem detail>
              <IonLabel>Add New Cloud</IonLabel>
            </IonItem>
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/admin" className="navigation-link">
              <IonItem detail>
                <IonLabel>Admin</IonLabel>
              </IonItem>
            </NavLink>
          )}
        </IonList>
        <IonContent>
          <IonGrid>
            <Switch>
              <PrivateRoute
                path="/admin"
                componentToRender={Admin}
                clouds={clouds}
                deleteHandler={deleteCloud}
              />
              <CloudRoute
                path="/clouds/cloud/:id"
                componentToRender={CloudSelection}
              />
              <Route
                path="/clouds"
                render={props => <CloudPage {...props} clouds={clouds} />}
              />
              <Route
                path="/add"
                render={props => (
                  <CloudForm {...props} SubmitHandler={addCloud} />
                )}
              />
              <Route path="/" component={Home} exact />
              <Route render={props => <PageNotFound {...props} />} />
            </Switch>
          </IonGrid>
        </IonContent>
      </div>
    </Router>
  );
};

export default App;

interface CloudProps extends RouteComponentProps {
  clouds: ICloud[];
}

const CloudPage: React.FC<CloudProps> = props => (
  <IonRow align-items-center>
    {props.clouds.map(cloud => (
      <IonCol sizeSm="12" sizeMd="4">
        <Cloud
          {...props}
          key={cloud.type}
          type={cloud.type}
          imageUrl={cloud.imageUrl}
        />
      </IonCol>
    ))}
  </IonRow>
);

type TParams = { id: string };

const CloudSelection: React.FC<RouteComponentProps<TParams>> = props => (
  <div>
    <IonTitle>{props.match.params.id}</IonTitle>
  </div>
);
