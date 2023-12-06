import { useEffect, useState } from "react";
import { useGetAllAppointments } from "../../api/appointment/useGetAllAppointments";
import { useGetAllAppointmentsByDoctorId } from "../../api/appointment/useGetAllAppointmentsByDoctorId";
import { useGetAllAppointmentsByPatientId } from "../../api/appointment/useGetAllAppointmentsByPatientId";
import { useApplicationStore } from "../../store/application.store";
import { AdministratorAppointments } from "../components/administrator-appointments.component";
import { DoctorAppointments } from "../components/doctor-appointments.component";
import { PatientAppointments } from "../components/patient-appointments.component";
import { Appointment as AppointmentModel } from "../model/appointment.model";

export const AppointmentPage = () => {
  const user = useApplicationStore((state) => state.user);
  const { getAllAppointments } = useGetAllAppointments();
  const { getAllAppointmentsByDoctorId } = useGetAllAppointmentsByDoctorId();
  const { getAllAppointmentsByPatientId } = useGetAllAppointmentsByPatientId();
  const [appointments, setAppointments] = useState<AppointmentModel[]>([]);

  const loadAppointments = async () => {
    let appointments = [];
    if (user?.role === "ADMINISTRATOR") {
      appointments = await getAllAppointments();
    } else if (user?.role === "DOCTOR") {
      appointments = await getAllAppointmentsByDoctorId();
    } else if (user?.role === "PATIENT") {
      appointments = await getAllAppointmentsByPatientId();
    }
    setAppointments(appointments);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div className="flex flex-col items-center mt-[5%] w-[88%]">
      <h1 className="text-3xl font-bold text-center mb-10">Appointments</h1>
      <div className="w-full h-4/5 overflow-y-auto flex flex-col items-center">
        {user?.role === "ADMINISTRATOR" ? (
          <AdministratorAppointments appointments={appointments} />
        ) : null}
        {user?.role === "DOCTOR" ? (
          <DoctorAppointments appointments={appointments} />
        ) : null}
        {user?.role === "PATIENT" ? (
          <PatientAppointments appointments={appointments} />
        ) : null}
      </div>
    </div>
  );
};
