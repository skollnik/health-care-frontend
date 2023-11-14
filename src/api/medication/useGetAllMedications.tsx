import { toast } from "react-toastify";
import { useAxios } from "../useAxios";

export const useGetAllMedications = () => {
  const { axios } = useAxios();

  const getAllMedications = async () => {
    try {
      const resp = await axios.get("/medication");
      return resp.data;
    } catch (error: any) {
      toast.error("Something went wrong!", { position: "bottom-right" });
    }
  };

  return { getAllMedications };
};
