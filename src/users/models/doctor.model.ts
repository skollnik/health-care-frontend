import { DoctorSpecialty } from "../doctor-specialty.enum";

export type Doctor = {
  id?: number;
  firstName: string;
  lastName: string;
  specialty: DoctorSpecialty;
};
