import { toast } from "react-toastify";
import { useAxios } from "../useAxios";
import { NewAppointment } from "../../appointment/model/appointment.model";

export const useCreateAppointment = () => {
  const { axios } = useAxios();

  const createAppointment = async (appointment: NewAppointment) => {
    try {
      await axios.post("appointment", appointment);
      toast.success("Successfully created a new appointment!", {
        position: "bottom-right",
      });
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message, { position: "bottom-right" });
      return false;
    }
  };

  return { createAppointment };
};
