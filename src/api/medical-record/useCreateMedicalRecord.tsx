import { MedicalRecord } from "../../medical-record/model/medical-record.model";
import { useAxios } from "../useAxios";
import { toast } from "react-toastify";

export const useCreateMedicalRecord = () => {
  const { axios } = useAxios();

  const createMedicalRecord = async (medicalRecord: MedicalRecord) => {
    try {
      await axios.post("medical-record", medicalRecord);
      toast.success("Successfully created Medical Record!", {
        position: "bottom-right",
      });
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message, { position: "bottom-right" });
      return false;
    }
  };

  return { createMedicalRecord };
};
