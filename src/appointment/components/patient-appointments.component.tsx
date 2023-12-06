import { useState } from "react";
import Modal from "react-modal";
import { Button } from "../../shared/components/button.component";
import { Appointment as AppointmentModel } from "../model/appointment.model";
import { NewAppointment } from "./new-appointment.component";
import { PatientAppointment } from "./patient-appointment.component";

type Props = {
  appointments: AppointmentModel[];
};

Modal.setAppElement("#root");

export const PatientAppointments = ({ appointments }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={openModal}
        className="bg-[#8e9aaf] hover:bg-[#6f7c91] text-white font-bold py-2 px-7 rounded-3xl focus:outline-none focus:shadow-outline cursor-pointer"
      >
        New Appointment
      </Button>
      {appointments.map((appointment) => (
        <PatientAppointment key={appointment.id} appointment={appointment} />
      ))}
      <Modal
        className="w-1/2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
        isOpen={isOpen}
      >
        <NewAppointment onClose={closeModal} />
      </Modal>
    </>
  );
};
