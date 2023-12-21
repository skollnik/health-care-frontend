import { useState } from "react";
import Modal from "react-modal";
import { Appointment as AppointmentModel } from "../model/appointment.model";
import { getStatusColor } from "../status-color.type";
import { getDateFormatted } from "../utils/get-date-formatted";
import { MedicalRecord } from "../../medical-record/components/medical-record.component";

type Props = {
  appointment: AppointmentModel;
};

export const AdministratorAppointment = ({ appointment }: Props) => {
  const [isOpenMedicalRecord, setIsOpenMedicalRecord] =
    useState<boolean>(false);

  const openModalMedicalRecord = () => {
    setIsOpenMedicalRecord(true);
  };

  const closeModalMedicalRecord = () => {
    setIsOpenMedicalRecord(false);
  };

  return (
    <>
      <div
        className={`flex flex-col items-center mt-[5%] w-[60%] min-h-[260px] rounded-xl ${getStatusColor(
          appointment.status
        )}`}
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
          <div className="w-1/5 h-full flex flex-col justify-center items-center">
            <p className="font-semibold">Description:</p>
            <p className="flex-1 text-center">{appointment.description}</p>
            <p className="font-semibold">Date:</p>
            <p>{getDateFormatted(appointment.date.toString())}</p>
            {appointment.medicalRecord ? (
              <p
                className="text-blue-700 cursor-pointer"
                onClick={openModalMedicalRecord}
              >
                View Medical Record
              </p>
            ) : null}
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
            <p className="font-semibold">Gender: </p>{" "}
            {appointment.patient.gender}
          </div>
        </div>
      </div>
      <Modal
        className="w-1/2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
        isOpen={isOpenMedicalRecord}
      >
        <MedicalRecord
          onClose={closeModalMedicalRecord}
          appointment={appointment}
        />
      </Modal>
    </>
  );
};
