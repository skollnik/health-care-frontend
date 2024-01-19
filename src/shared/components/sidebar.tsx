import { useNavigate } from "react-router-dom";
import { useApplicationStore } from "../../store/application.store";
import { CiLogout } from "react-icons/ci";
import { useSocketConnection } from "../../api/socket/useSocketConnection";
import { Appointment } from "../../appointment/model/appointment.model";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { MedicalRecord } from "../../medical-record/model/medical-record.model";
import { FaHome } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPills } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";

export const Sidebar = () => {
  const navigate = useNavigate();
  const user = useApplicationStore((state) => state.user);
  const logout = useApplicationStore((state) => state.logout);
  const { observable } = useSocketConnection();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const appointmentCreatedNotId = observable.bind(
      "appointmentCreatedNotification",
      (appointment: Appointment) => {
        toast.info("New appointment!", {
          position: "bottom-right",
        });
      }
    );

    const appointmentUpdatedNotId = observable.bind(
      "appointmentUpdatedNotification",
      (appointment: Appointment) => {
        toast.info(`Your appointment has been ${appointment.status}!`, {
          position: "bottom-right",
        });
      }
    );

    const medicalRecordNotId = observable.bind(
      "medicalRecordCreatedNotification",
      (medicalRecord: MedicalRecord) => {
        toast.info("You have new Medical Record!", {
          position: "bottom-right",
        });
      }
    );

    return () => {
      observable.unbind(appointmentCreatedNotId);
      observable.unbind(appointmentUpdatedNotId);
      observable.unbind(medicalRecordNotId);
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="w-[12%] bg-[#16425b] h-screen flex flex-col">
      <div className="h-[10%] mt-5 flex items-center justify-center">
        {user?.avatar ? (
          <div className="h-12 w-12 rounded-full bg-red-100 mx-1"></div>
        ) : (
          <div className="bg-slate-400 h-12 w-12 rounded-full mx-1 flex justify-center items-center text-white">
            {user?.firstName.charAt(0)} {user?.lastName.charAt(0)}
          </div>
        )}
        <p className="text-sm break-words w-[70%] max-w-[70%] min-w-[70%] text-white">
          {user?.firstName} {user?.lastName}
        </p>
      </div>
      <div className="text-white text-center">{user?.role}</div>
      <div className="flex-1 my-24 text-white">
        <div
          className="w-full m-3 cursor-pointer hover:text-gray-300 flex items-center"
          onClick={() => navigate("/home")}
        >
          <FaHome className="mr-2" size={20} />
          Home
        </div>
        {user?.role === "ADMINISTRATOR" ? (
          <>
            <div
              className="w-full m-3 cursor-pointer hover:text-gray-300 flex items-center"
              onClick={() => navigate("/register-new-doctor")}
            >
              <FaAddressBook className="mr-2" size={20} />
              Register new doctor
            </div>
            <div
              className="w-full m-3 cursor-pointer hover:text-gray-300 flex items-center"
              onClick={() => navigate("/register-new-patient")}
            >
              <FaAddressBook className="mr-2" size={20} />
              Register new patient
            </div>
          </>
        ) : null}
        {user?.role === "ADMINISTRATOR" || user?.role === "DOCTOR" ? (
          <div
            className="w-full m-3 cursor-pointer hover:text-gray-300 flex items-center"
            onClick={() => navigate("/medication")}
          >
            <FaPills className="mr-3" size={20} />
            Medication
          </div>
        ) : null}
        <div
          className="w-full m-3 cursor-pointer hover:text-gray-300 flex items-center"
          onClick={() => navigate("/appointment")}
        >
          <FaCalendarAlt className="mr-2" size={20} />
          Appointment
        </div>
      </div>
      <div className="h-[10%] mb-5 flex items-center justify-center">
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={onLogout}
        >
          <CiLogout color="white" size={30} className="mr-2" />
          <p className="text-lg text-white">Logout</p>
        </div>
      </div>
    </div>
  );
};
