import { Doctor } from "../../users/models/doctor.model";
import { Patient } from "../../users/models/patient.model";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  doctor?: Doctor;
  patient?: Patient;
  avatar: string;
};
