import { RouteProps } from "react-router";

interface ICloud {
  type: string;
  imageUrl: string;
}

interface NewCloudProp {
  SubmitHandler: MouseEvent<HTMLIonButtonElement>;
}

interface AdminPageProps extends RouteProps, CustomRouteProps {
  clouds: ICloud[];
  deleteHandler: MouseEvent<HTMLIonButtonElement>;
}

interface CustomRouteProps extends RouteProps {
  componentToRender: React.ComponentType<any>;
}
