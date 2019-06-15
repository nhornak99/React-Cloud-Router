import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from "@ionic/react";
import "../styles/_cloud.scss";
import { RouteComponentProps, Link } from "react-router-dom";

interface CloudProp extends RouteComponentProps {
  type: string;
  imageUrl: string;
}

const Cloud: React.FC<CloudProp> = ({ type, imageUrl, ...rest }) => {
  const [cloudType, setCloudType] = useState(type);
  const [image, setImage] = useState(imageUrl);

  return (
    <Link to={`${rest.match.url}/cloud/${cloudType}`}>
      <IonCard class="cloud-card">
        <IonCardHeader class="cloud-header-cntr">
          <IonCardTitle>{cloudType}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent no-padding class="cloud-content-cntr">
          <img src={image} />
        </IonCardContent>
      </IonCard>
    </Link>
  );
};

export default Cloud;
