import { useEditAppointment } from "../../api/appointment/useEditAppointment";
import { Button } from "../../shared/components/button.component";
import { Appointment as AppointmentModel } from "../model/appointment.model";
import { getStatusColor } from "../status-color.type";
import { getDateFormatted } from "../utils/get-date-formatted";
import { FaCheck } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";

type Props = {
  appointment: AppointmentModel;
};

export const DoctorAppointment = ({ appointment }: Props) => {
  const { editAppointment } = useEditAppointment();

  const handleAppointmentConfirmed = async () => {
    await editAppointment(appointment.id!, "CONFIRMED");
  };
  const handleAppointmentCanceled = async () => {
    await editAppointment(appointment.id!, "CANCELED");
  };

  return (
    <div
      className={`flex flex-col items-center mt-[5%] w-[60%] min-h-[260px] max-h-[300px] rounded-xl ${getStatusColor(
        appointment.status
      )}`}
    >
      <div className="w-full text-center mb-5 font-bold">
        {appointment.status}
      </div>
      <div className="flex w-full">
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
        <div className="w-1/5 h-32 flex flex-col justify-center items-center">
          <p className="font-semibold">Description:</p>
          {appointment.description}
          <p className="font-semibold">Date:</p>
          {getDateFormatted(appointment.date.toString())}
        </div>
        <div className="w-2/5 flex flex-col justify-center items-center">
          {appointment.status === "PENDING" ? (
            <div className="flex">
              <Button
                className="bg-green-300 rounded-md p-1 mx-0.5"
                onClick={handleAppointmentConfirmed}
              >
                <FaCheck className="text-green-500" size={25} />
              </Button>
              <Button
                className="bg-red-300 rounded-md p-1 mx-0.5"
                onClick={handleAppointmentCanceled}
              >
                <FaX className="text-red-500" size={25} />
              </Button>
            </div>
          ) : null}
          {appointment.status === "CONFIRMED" ? (
            <p className="text-blue-700 cursor-pointer">
              Add new Medical Record
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
