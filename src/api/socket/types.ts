import { Appointment } from "../../appointment/model/appointment.model";
import { MedicalRecord } from "../../medical-record/model/medical-record.model";

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  appointmentCreatedNotification: (msg: Appointment) => void;
  appointmentUpdatedNotification: (msg: Appointment) => void;
  medicalRecordCreatedNotification: (msg: MedicalRecord) => void;
}

export interface ClientToServerEvents {
  register: (data: number) => void;
}
