import { Appointment as AppointmentModel } from "../model/appointment.model";
import { getStatusColor } from "../status-color.type";
import { getDateFormatted } from "../utils/get-date-formatted";

type Props = {
  appointment: AppointmentModel;
};

export const AdministratorAppointment = ({ appointment }: Props) => {

  return (
    <div
      className={`flex flex-col items-center mt-[5%] w-[60%] min-h-[260px] max-h-[300px] rounded-xl ${getStatusColor(appointment.status)}`}
    >
      <div className="w-full text-center mb-5 font-bold">
        {appointment.status}
      </div>
      <div className="flex w-full">
        <div className="w-2/5 flex flex-col justify-center items-center">
          <div className="bg-slate-400 h-12 w-12 rounded-full mx-1 flex justify-center items-center text-white">
            {appointment.doctor.firstName.charAt(0)}{" "}
            {appointment.doctor.lastName.charAt(0)}
          </div>
          <p className="font-semibold">First name: </p>
          {appointment.doctor.firstName}
          <p className="font-semibold">Last name: </p>
          {appointment.doctor.lastName}
          <p className="font-semibold">Specialty: </p>{" "}
          {appointment.doctor.specialty}
        </div>
        <div className="w-1/5 h-32 flex flex-col justify-center items-center">
          <p className="font-semibold">Description:</p>
          {appointment.description}
          <p className="font-semibold">Date:</p>
          {getDateFormatted(appointment.date.toString())}
        </div>
        <div className="w-2/5 flex flex-col justify-center items-center">
          <div className="bg-slate-400 h-12 w-12 rounded-full mx-1 flex justify-center items-center text-white">
            {appointment.patient.firstName.charAt(0)}{" "}
            {appointment.patient.lastName.charAt(0)}
          </div>
          <p className="font-semibold">First name: </p>
          {appointment.patient.firstName}
          <p className="font-semibold">Last name: </p>
          {appointment.patient.lastName}
          <p className="font-semibold">Gender: </p> {appointment.patient.gender}
        </div>
      </div>
    </div>
  );
};
