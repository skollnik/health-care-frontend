import { useEffect, useState } from "react";
import { Button } from "../../shared/components/button.component";
import { useCreateAppointment } from "../../api/appointment/useCreateAppointment";
import { NewAppointment as AppointmentModel } from "../model/appointment.model";
import { Doctor } from "../../users/models/doctor.model";
import { useGetAllDoctors } from "../../api/specialization/useGetAllDoctors";
import { toast } from "react-toastify";

type Props = {
  onClose: () => void;
};

const defaultValues = {
  doctorId: -1,
  patientId: -1,
  description: "",
  date: new Date(),
};

export const NewAppointment = ({ onClose }: Props) => {
  const { createAppointment } = useCreateAppointment();
  const { getAllDoctors } = useGetAllDoctors();

  const [newAppointment, setNewAppointment] =
    useState<AppointmentModel>(defaultValues);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const onNewAppointment = async () => {
    if (
      !newAppointment?.doctorId ||
      newAppointment.description.trim() === "" ||
      newAppointment.date < new Date()
    ) {
      toast.error("Please fill in all fields correctly.", {
        position: "bottom-right",
      });
      return;
    }

    const resp = await createAppointment(newAppointment as AppointmentModel);
    if (resp) {
      onClose();
    }
  };

  const loadDoctors = async () => {
    const resp = await getAllDoctors();
    setDoctors(resp);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  return (
    <div className="w-full h-full rounded-md">
      <div className="w-full h-[10%] bg-[#16425b] flex items-center p-3 text-white">
        <h1 className="text-3xl">New Appointment</h1>
      </div>
      <div className="w-full flex flex-1 flex-col justify-center items-center bg-[#f6f4d2]">
        <select
          className="border rounded bg-gray-50 w-[90%] py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none"
          id="grid-state"
          onChange={(e) => {
            const selectedDoctorId = parseInt(e.target.value, 10);
            setNewAppointment((prevValues) => ({
              ...(prevValues as AppointmentModel),
              doctorId: selectedDoctorId,
            }));
          }}
        >
          <option value={-1}>---SELECT A DOCTOR---</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.firstName} {doctor.lastName} - [{doctor.specialty}]
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          className="border rounded bg-gray-50 w-[90%] py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none"
          onChange={(e) => {
            setNewAppointment((prevValues) => ({
              ...(prevValues as AppointmentModel),
              date: new Date(e.target.value),
            }));
          }}
        />
        <textarea
          onChange={(e) =>
            setNewAppointment((prevValues) => ({
              ...(prevValues as AppointmentModel),
              description: e.target.value,
            }))
          }
          className="border rounded bg-gray-50 w-[90%] py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none resize-none"
          placeholder="Description..."
          rows={5}
        />
      </div>
      <div className="w-full flex justify-end bg-[#f6f4d2] p-3">
        <Button
          onClick={onClose}
          className="w-[15%] mx-3 bg-[#8e9aaf] hover:bg-[#6f7c91] text-white font-bold py-2 px-7 rounded-3xl focus:outline-none focus:shadow-outline cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          className="w-[15%] mx-3 bg-[#8e9aaf] hover:bg-[#6f7c91] text-white font-bold py-2 px-7 rounded-3xl focus:outline-none focus:shadow-outline cursor-pointer"
          onClick={onNewAppointment}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
