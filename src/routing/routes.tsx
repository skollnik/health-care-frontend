import { RouteObject } from "react-router-dom";
import App from "../App";
import { AppointmentPage } from "../appointment/pages/appointment.page";
import { AuthWrapper } from "../auth/components/auth-wrapper";
import { LoginPage } from "../auth/pages/login.page";
import { HomePage } from "../home/pages/home.page";
import { MedicationPage } from "../medication/pages/medication.page";
import { RegisterNewDoctorPage } from "../users/pages/register-new-doctor.page";
import { RegisterNewPatientPage } from "../users/pages/register-new-patient.page";
import { ErrorPage } from "../shared/pages/error.page";

export const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        path: "home",
        element: (
          <AuthWrapper roles={["ADMINISTRATOR", "DOCTOR", "PATIENT"]}>
            <HomePage />
          </AuthWrapper>
        ),
      },
      {
        path: "register-new-doctor",
        element: (
          <AuthWrapper roles={["ADMINISTRATOR"]}>
            <RegisterNewDoctorPage />
          </AuthWrapper>
        ),
      },
      {
        path: "register-new-patient",
        element: (
          <AuthWrapper roles={["ADMINISTRATOR"]}>
            <RegisterNewPatientPage />
          </AuthWrapper>
        ),
      },
      {
        path: "medication",
        element: (
          <AuthWrapper roles={["ADMINISTRATOR", "DOCTOR"]}>
            <MedicationPage />
          </AuthWrapper>
        ),
      },
      {
        path: "appointment",
        element: (
          <AuthWrapper roles={["ADMINISTRATOR", "DOCTOR", "PATIENT"]}>
            <AppointmentPage />
          </AuthWrapper>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];
