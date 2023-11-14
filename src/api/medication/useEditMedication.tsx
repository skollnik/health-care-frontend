import { toast } from "react-toastify";
import { Medication } from "../../medication/model/medication.model";
import { useAxios } from "../useAxios";

export const useEditMedication = () => {
  const { axios } = useAxios();

  const editMedication = async (id: number, medication: Medication) => {
    try {
      await axios.patch(`/medication/${id}`, medication);
      toast.success("Successfully updated medication!", {
        position: "bottom-right",
      });
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message, { position: "bottom-right" });
    }
  };

  return { editMedication };
};
