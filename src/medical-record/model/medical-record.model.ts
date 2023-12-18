import { Medication } from "../../medication/model/medication.model";

export type MedicalRecord = {
  appointmentId: number;
  diagnosis: string;
  medications?: Medication[];
};
