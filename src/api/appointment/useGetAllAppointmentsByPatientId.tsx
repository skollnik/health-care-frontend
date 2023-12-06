import { toast } from "react-toastify";
import { useAxios } from "../useAxios";

export const useGetAllAppointmentsByPatientId = () => {
  const { axios } = useAxios();

  const getAllAppointmentsByPatientId = async () => {
    try {
      const resp = await axios.get("/appointment/patient");
      return resp.data;
    } catch (error: any) {
      toast.error("Something went wrong!", { position: "bottom-right" });
    }
  };
  return { getAllAppointmentsByPatientId };
};
