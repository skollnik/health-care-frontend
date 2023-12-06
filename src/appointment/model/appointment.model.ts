import { MedicalRecord } from "../../medical-record/model/medical-record.model";
import { Doctor } from "../../users/models/doctor.model";
import { Patient } from "../../users/models/patient.model";

export type Appointment = {
  id?: number;
  doctorId: number;
  patientId: number;
  doctor: Doctor;
  patient: Patient;
  description: string;
  status: string;
  date: Date;
  medicalRecord?: MedicalRecord;
};

export type NewAppointment = {
  doctorId: number;
  patientId: number;
  description: string;
  date: Date;
};
