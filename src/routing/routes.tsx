import { RouteObject } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../auth/pages/login.page";
import { HomePage } from "../home/pages/home.page";
import { AuthWrapper } from "../auth/components/auth-wrapper";
import { RegisterNewDoctorPage } from "../users/pages/register-new-doctor.page";
import { RegisterNewPatientPage } from "../users/pages/register-new-patient.page";
import { MedicationPage } from "../medication/pages/medication.page";
import { AppointmentPage } from "../appointment/pages/appointment.page";

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
        children: [
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
    ],
  },
];
