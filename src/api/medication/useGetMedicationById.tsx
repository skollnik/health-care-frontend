import { toast } from "react-toastify";
import { useAxios } from "../useAxios";

export const useGetMedicationById = () => {
  const { axios } = useAxios();

  const getMedicationById = async (id: number) => {
    try {
      const resp = await axios.get(`/medication/${id}`);
      return resp.data;
    } catch (error: any) {
      toast.error(error.response.data.message, { position: "bottom-right" });
    }
  };

  return { getMedicationById };
};
