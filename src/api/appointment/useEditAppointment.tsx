import { toast } from "react-toastify";
import { useAxios } from "../useAxios";

export const useEditAppointment = () => {
  const { axios } = useAxios();

  const editAppointment = async (
    id: number,
    appointmentStatus: "CONFIRMED" | "CANCELED"
  ) => {
    try {
      await axios.patch(`/appointment/${id}`, { status: appointmentStatus });
      toast.success("Success!", { position: "bottom-right" });
    } catch (error: any) {
      toast.error(error.response.data.message, { position: "bottom-right" });
    }
  };

  return { editAppointment };
};
