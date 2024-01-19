import { FaCheck, FaX } from "react-icons/fa6";
import Modal from "react-modal";
import { useEditAppointment } from "../../api/appointment/useEditAppointment";
import { Button } from "../../shared/components/button.component";
import { Appointment as AppointmentModel } from "../model/appointment.model";
import { getStatusColor } from "../status-color.type";
import { getDateFormatted } from "../utils/get-date-formatted";
import { useState } from "react";
import { NewMedicalRecord } from "../../medical-record/components/new-medical-record.component";
import { MedicalRecord } from "../../medical-record/components/medical-record.component";
import { useQueryClient } from "react-query";

type Props = {
  appointment: AppointmentModel;
};

export const DoctorAppointment = ({ appointment }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenMedicalRecord, setIsOpenMedicalRecord] =
    useState<boolean>(false);
  const queryClient = useQueryClient();
  const queryKey = ["appointments"];

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModalMedicalRecord = () => {
    setIsOpenMedicalRecord(true);
  };

  const closeModalMedicalRecord = () => {
    setIsOpenMedicalRecord(false);
  };

  const { editAppointment } = useEditAppointment();

  const handleAppointmentConfirmed = async () => {
    await editAppointment(appointment.id!, "CONFIRMED");
    await queryClient.invalidateQueries(queryKey);
  };
  const handleAppointmentCanceled = async () => {
    await editAppointment(appointment.id!, "CANCELED");
    await queryClient.invalidateQueries(queryKey);
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
          <div className="w-1/5 h-full flex flex-col justify-center items-center">
            <p className="font-semibold">Description:</p>
            <p className="flex-1 text-center">{appointment.description}</p>
            <p className="font-semibold">Date:</p>
            <p className="flex-1">
              {getDateFormatted(appointment.date.toString())}
            </p>
            {appointment.medicalRecord ? (
              <p
                className="text-blue-700 cursor-pointer text-center"
                onClick={openModalMedicalRecord}
              >
                View Medical Record
              </p>
            ) : null}
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
            {appointment.status === "CONFIRMED" &&
            appointment.medicalRecord === null ? (
              <p className="text-blue-700 cursor-pointer" onClick={openModal}>
                Add new Medical Record
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <Modal
        className="w-1/2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
        isOpen={isOpen}
      >
        <NewMedicalRecord
          onClose={closeModal}
          appointmentId={appointment.id!}
        />
      </Modal>
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
