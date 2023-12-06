import { toast } from "react-toastify";
import { useAxios } from "../useAxios";

export const useDeleteMedication = () => {
  const { axios } = useAxios();

  const deleteMedication = async (id: number) => {
    try {
      await axios.delete(`/medication/${id}`);
      toast.success("Successfully deleted medication!", {
        position: "bottom-right",
      });
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message, { position: "bottom-right" });
      return false;
    }
  };
  return { deleteMedication };
};
