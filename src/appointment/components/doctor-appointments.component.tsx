import { Appointment as AppointmentModel } from "../model/appointment.model";
import { DoctorAppointment } from "./doctor-appointment.component";

type Props = {
  appointments: AppointmentModel[];
};

export const DoctorAppointments = ({ appointments }: Props) => {
  return (
    <>
      {appointments.map((appointment) => (
        <DoctorAppointment key={appointment.id} appointment={appointment} />
      ))}
    </>
  );
};
