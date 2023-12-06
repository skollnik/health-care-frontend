import { Appointment as AppointmentModel } from "../model/appointment.model";
import { AdministratorAppointment } from "./administrator-appointment.component";

type Props = {
  appointments: AppointmentModel[];
};

export const AdministratorAppointments = ({ appointments }: Props) => {
  return (
    <>
      {appointments.map((appointment) => (
        <AdministratorAppointment
          key={appointment.id}
          appointment={appointment}
        />
      ))}
    </>
  );
};
