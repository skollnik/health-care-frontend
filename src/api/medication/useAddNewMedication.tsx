import { useAxios } from "../useAxios";
import { toast } from "react-toastify";

type Medication = {
  name: string;
  description: string;
};

export const useAddNewMedication = () => {
  const { axios } = useAxios();

  const addNewMedication = async (medication: Medication) => {
    try {
      await axios.post("/medication", medication);
      toast.success("Successfully created a new medication!", {
        position: "bottom-right",
      });
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message, { position: "bottom-right" });
      return false;
    }
  };

  return { addNewMedication };
};
