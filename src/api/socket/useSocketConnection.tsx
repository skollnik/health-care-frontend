import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/application.store";
import { Observable } from "./observers/observable";
import { ClientToServerEvents, ServerToClientEvents } from "./types";
import { Socket, io } from "socket.io-client";
import { Appointment } from "../../appointment/model/appointment.model";
import { MedicalRecord } from "../../medical-record/model/medical-record.model";

export const useSocketConnection = () => {
  const token = useApplicationStore((state) => state.token);
  const url = process.env.REACT_APP_BACKEND_URL ?? "http://localhost:8080";
  const observable = new Observable<ServerToClientEvents>();

  const [client, setClient] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(url, {
      extraHeaders: { Authorization: `Bearer ${token}` },
    });

    socket.on("connect", () => {
      console.log("Socket connected!");
    });

    socket.on("appointmentCreatedNotification", (msg: Appointment) => {
      observable.emit("appointmentCreatedNotification", msg);
    });

    socket.on("appointmentUpdatedNotification", (msg: Appointment) => {
      observable.emit("appointmentUpdatedNotification", msg);
    });

    socket.on("medicalRecordCreatedNotification", (msg: MedicalRecord) => {
      observable.emit("medicalRecordCreatedNotification", msg);
    });

    setClient(socket);
  }, []);

  return { client, observable };
};
