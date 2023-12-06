import { toast } from "react-toastify";
import { useAxios } from "../useAxios";

export const useGetAllAppointmentsByDoctorId = () => {
  const { axios } = useAxios();

  const getAllAppointmentsByDoctorId = async () => {
    try {
      const resp = await axios.get("/appointment/doctor");
      return resp.data;
    } catch (error: any) {
      toast.error("Something went wrong!", { position: "bottom-right" });
    }
  };
  return { getAllAppointmentsByDoctorId };
};
