import { useRef } from "react";
import { Appointment } from "../../appointment/model/appointment.model";
import { Button } from "../../shared/components/button.component";
import { useDownloadPdf } from "../../shared/hooks/useDownloadPdf";

type Props = {
  onClose: () => void;
  appointment: Appointment;
};

export const MedicalRecord = ({ appointment, onClose }: Props) => {
  const pdfRef = useRef(null);

  const { downloadPDF } = useDownloadPdf(pdfRef);

  return (
    <>
      <div className="w-full h-full rounded-md" ref={pdfRef}>
        <div className="w-full h-[10%] bg-[#16425b] flex items-center p-3 text-white">
          <h1 className="text-3xl">Medical Record</h1>
        </div>
        <div className="w-full flex flex-1 flex-col bg-[#f6f4d2] p-3">
          <div className="w-full flex mb-5">
            <div className="w-1/2 flex flex-col justify-center items-center">
              <p className="font-semibold text-lg">Doctor:</p>
              <p className="font-semibold">First name:</p>
              {appointment.doctor.firstName}
              <p className="font-semibold">Last name:</p>
              {appointment.doctor.lastName}
              <p className="font-semibold">Specialty:</p>
              {appointment.doctor.specialty}
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center">
              <p className="font-semibold text-lg">Patient:</p>
              <p className="font-semibold">First name:</p>
              {appointment.patient.firstName}
              <p className="font-semibold">Last name:</p>
              {appointment.patient.lastName}
              <p className="font-semibold">Gender:</p>
              {appointment.patient.gender}
            </div>
          </div>
          <div className="w-full">
            <p className="font-semibold text-2xl mb-1">Description:</p>
            <p className="mb-5">{appointment.description}</p>
          </div>
          <div className="w-full border-b-2 border-b-[#16425b] my-3"></div>
          <div className="w-full">
            <p className="font-semibold text-2xl mb-1">Diagnosis:</p>
            <p className="mb-5">{appointment.medicalRecord?.diagnosis}</p>
            <p className="font-semibold text-2xl mb-1">Medications: </p>
            {appointment?.medicalRecord?.medications &&
            appointment.medicalRecord.medications.length > 0 ? (
              <div>
                {appointment?.medicalRecord.medications.map(
                  (medication, index) => (
                    <div key={index}>
                      <p className="font-semibold">{medication.name}</p>
                      <p>{medication.description}</p>
                    </div>
                  )
                )}
              </div>
            ) : (
              "/"
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end bg-[#f6f4d2] p-3">
        <Button
          onClick={downloadPDF}
          className="btn min-w-[15%] mx-3 bg-[#8e9aaf] hover:bg-[#6f7c91] text-white font-bold py-2 px-7 rounded-3xl focus:outline-none focus:shadow-outline cursor-pointer"
        >
          Download PDF
        </Button>
        <Button
          onClick={onClose}
          className="btn min-w-[15%] mx-3 bg-[#8e9aaf] hover:bg-[#6f7c91] text-white font-bold py-2 px-7 rounded-3xl focus:outline-none focus:shadow-outline cursor-pointer"
        >
          Cancel
        </Button>
      </div>
    </>
  );
};
