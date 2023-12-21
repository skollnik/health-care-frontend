import { UseQueryResult, useQuery } from "react-query";
import { useGetAllAppointments } from "../../api/appointment/useGetAllAppointments";
import { Appointment as AppointmentModel } from "../model/appointment.model";
import { AdministratorAppointment } from "./administrator-appointment.component";

export const AdministratorAppointments = () => {
  const { getAllAppointments } = useGetAllAppointments();
  const { data: appointments }: UseQueryResult<AppointmentModel[], unknown> =
    useQuery("appointments", getAllAppointments);
  return (
    <>
      {appointments?.map((appointment) => (
        <AdministratorAppointment
          key={appointment.id}
          appointment={appointment}
        />
      ))}
    </>
  );
};
