import { toast } from "react-toastify";
import { DoctorSpecialty } from "../../users/doctor-specialty.enum";
import { useAxios } from "../useAxios";

type DoctorRegistration = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  specialty: DoctorSpecialty;
};

export const useRegisterDoctor = () => {
  const { axios } = useAxios();

  const registerDoctor = async (doctor: DoctorRegistration) => {
    try {
      await axios.post("/auth/register/doctor", doctor);
      toast.success("Successfully registered doctor!", {
        position: "bottom-right",
      });
    } catch (error: any) {
      toast.error(error.response.data.message, { position: "bottom-right" });
    }
  };

  return { registerDoctor };
};
