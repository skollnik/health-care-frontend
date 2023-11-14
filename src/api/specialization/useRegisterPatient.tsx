import { toast } from "react-toastify";
import { useAxios } from "../useAxios";
import { Gender } from "../../users/gender.enum";

type PatientRegistration = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: Gender;
};

export const useRegisterPatient = () => {
  const { axios } = useAxios();

  const registerPatient = async (patient: PatientRegistration) => {
    try {
      await axios.post("/auth/register/patient", patient);
      toast.success("Successfully registered patient!", {
        position: "bottom-right",
      });
    } catch (error: any) {
      toast.error(error.response.data.message, { position: "bottom-right" });
    }
  };

  return { registerPatient };
};
