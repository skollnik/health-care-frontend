import { useApplicationStore } from "../../store/application.store";
import { AdministratorAppointments } from "../components/administrator-appointments.component";
import { DoctorAppointments } from "../components/doctor-appointments.component";
import { PatientAppointments } from "../components/patient-appointments.component";

export const AppointmentPage = () => {
  const user = useApplicationStore((state) => state.user);

  return (
    <div className="flex flex-col items-center mt-[5%] w-[88%]">
      <h1 className="text-3xl font-bold text-center mb-10">Appointments</h1>
      <div className="w-full h-4/5 overflow-y-auto flex flex-col items-center">
        {user?.role === "ADMINISTRATOR" ? <AdministratorAppointments /> : null}
        {user?.role === "DOCTOR" ? <DoctorAppointments /> : null}
        {user?.role === "PATIENT" ? <PatientAppointments /> : null}
      </div>
    </div>
  );
};
