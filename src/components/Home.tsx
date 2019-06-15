import React from "react";
import { IonItem, IonLabel, IonTitle, IonText } from "@ionic/react";
import "../styles/_home.scss";

const Home = () => {
  return (
    <div id="home-cntr">
      <IonText color="secondary">
        <h3>
          Clouds are very beautiful. They put a smile on my face when I see them
          in the blue sky on a sunny and/or partly sunny day.
        </h3>
      </IonText>
    </div>
  );
};

export default Home;
