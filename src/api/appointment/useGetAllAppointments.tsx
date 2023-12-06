import { toast } from "react-toastify";
import { useAxios } from "../useAxios";

export const useGetAllAppointments = () => {
  const { axios } = useAxios();
  const getAllAppointments = async () => {
    try {
      const resp = await axios.get("/appointment/all");
      return resp.data;
    } catch (error: any) {
      toast.error("Something went wrong!", { position: "bottom-right" });
    }
  };
  return { getAllAppointments };
};
