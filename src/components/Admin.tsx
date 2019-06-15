import React from "react";
import { AdminPageProps } from "../definitions/ICloud";
import {
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonIcon
} from "@ionic/react";

const Admin: React.FC<AdminPageProps> = (props: AdminPageProps) => {
  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Delete Clouds</IonLabel>
      </IonListHeader>
      {props.clouds.map(cloud => (
        <IonItem key={cloud.type}>
          <IonLabel>{cloud.type}</IonLabel>
          <IonIcon
            name="trash"
            slot="end"
            onClick={e => props.deleteHandler(e, cloud.type)}
          />
        </IonItem>
      ))}
    </IonList>
  );
};

export default Admin;
