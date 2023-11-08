import { RouteObject } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../auth/pages/login.page";
import { HomePage } from "../home/pages/home.page";
import { AuthWrapper } from "../auth/components/auth-wrapper";

export const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthWrapper roles={["ADMINISTRATOR", "DOCTOR", "PATIENT"]}>
            <HomePage />
          </AuthWrapper>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
];
