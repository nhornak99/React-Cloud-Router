import React, { useState } from "react";
import {
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/react";
import { Prompt } from "react-router";
import { NewCloudProp, ICloud } from "../definitions/ICloud";

const CloudForm: React.FC<NewCloudProp> = (props: NewCloudProp) => {
  const [newCloud, setNewCloud] = useState<ICloud>({ type: "", imageUrl: "" });
  const [isValid, setIsValid] = useState<boolean>(false);

  const UpdateValidity = () => {
    if (newCloud.type && newCloud.imageUrl) setIsValid(true);
  };

  const CheckIfFormWasStarted = (): boolean => {
    return newCloud.type !== "" || newCloud.imageUrl !== "";
  };

  return (
    <IonGrid>
      <IonRow class="ion-justify-content-center">
        <IonCol sizeSm="12" sizeMd="6">
          <Prompt
            when={CheckIfFormWasStarted() && !isValid}
            message="Leaving this form will lose your data."
          />
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Add Cloud</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form onSubmit={e => props.SubmitHandler(e, newCloud)}>
                <IonItem>
                  <IonInput
                    placeholder="Name"
                    value={newCloud.type}
                    onIonChange={e => {
                      let type = (e.currentTarget as HTMLIonInputElement).value;
                      newCloud.type = type ? type : newCloud.type;
                      setNewCloud(newCloud);
                      UpdateValidity();
                    }}
                  />
                </IonItem>
                <IonItem>
                  <IonInput
                    placeholder="Image"
                    value={newCloud.imageUrl}
                    onIonChange={e => {
                      let image = (e.currentTarget as HTMLIonInputElement)
                        .value;
                      newCloud.imageUrl = image ? image : newCloud.imageUrl;
                      setNewCloud(newCloud);
                      UpdateValidity();
                    }}
                  />
                </IonItem>
                <IonButton type="submit" disabled={!isValid}>
                  Add
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default CloudForm;
