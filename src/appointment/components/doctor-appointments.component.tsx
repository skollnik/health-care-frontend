import { UseQueryResult, useQuery } from "react-query";
import { Appointment as AppointmentModel } from "../model/appointment.model";
import { DoctorAppointment } from "./doctor-appointment.component";
import { useGetAllAppointmentsByDoctorId } from "../../api/appointment/useGetAllAppointmentsByDoctorId";

export const DoctorAppointments = () => {
  const { getAllAppointmentsByDoctorId } = useGetAllAppointmentsByDoctorId();
  const { data: appointments }: UseQueryResult<AppointmentModel[], unknown> =
    useQuery("appointments", getAllAppointmentsByDoctorId);

  return (
    <>
      {appointments?.map((appointment) => (
        <DoctorAppointment key={appointment.id} appointment={appointment} />
      ))}
    </>
  );
};
