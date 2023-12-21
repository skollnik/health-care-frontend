import { Fragment, useEffect, useState } from "react";
import { Button } from "../../shared/components/button.component";
import { useGetAllMedications } from "../../api/medication/useGetAllMedications";
import { Medication } from "../../medication/model/medication.model";
import { toast } from "react-toastify";
import { useCreateMedicalRecord } from "../../api/medical-record/useCreateMedicalRecord";
import { useQueryClient } from "react-query";

type Props = {
  appointmentId: number;
  onClose: () => void;
};

export const NewMedicalRecord = ({ onClose, appointmentId }: Props) => {
  const { createMedicalRecord } = useCreateMedicalRecord();
  const { getAllMedications } = useGetAllMedications();
  const [selectedMedications, setSelectedMedications] = useState<Medication[]>(
    []
  );
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [allMedications, setAllMedications] = useState<Medication[]>([]);
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const loadAllMedications = async () => {
    const medications = await getAllMedications();
    setAllMedications(medications);
  };

  const onNewMedicalRecord = async () => {
    if (diagnosis.trim() === "") {
      toast.error("Fields should not be empty!", { position: "bottom-right" });
      return;
    }

    await createMedicalRecord({
      appointmentId,
      diagnosis,
      medications: selectedMedications,
    });

    onClose();
    queryClient.invalidateQueries("appointments");
  };

  const handleCheckboxChange = (medication: Medication) => {
    setSelectedMedications((prevMedications) => {
      const isMedicationSelected = prevMedications.some(
        (m) => m.id === medication.id
      );
      if (isMedicationSelected) {
        return prevMedications.filter((m) => m.id !== medication.id);
      } else {
        return [...prevMedications, medication];
      }
    });
  };

  const toggleDropdown = () => {
    setDropdownMenu((prevValue) => !prevValue);
  };

  useEffect(() => {
    loadAllMedications();
  }, []);

  return (
    <div className="w-full h-full rounded-md">
      <div className="w-full h-[10%] bg-[#16425b] flex items-center p-3 text-white">
        <h1 className="text-3xl">Add Medical Record</h1>
      </div>
      <div className="w-full flex flex-1 flex-col justify-center items-center bg-[#f6f4d2]">
        <Button
          className="w-[15%] mx-3 mt-3 bg-[#8e9aaf] hover:bg-[#6f7c91] text-white font-bold py-2 px-7 rounded-3xl focus:outline-none focus:shadow-outline cursor-pointer"
          onClick={toggleDropdown}
        >
          Medications
        </Button>
        {dropdownMenu ? (
          <div className="z-10 absolute top-[31%] bg-white rounded-lg shadow w-60 dark:bg-gray-700">
            <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200 no-scrollbar">
              {allMedications.map((medication) => (
                <li key={medication.id}>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id={medication.id!.toString()}
                      type="checkbox"
                      value=""
                      onChange={() => handleCheckboxChange(medication)}
                      checked={selectedMedications.some(
                        (m) => m.id === medication.id
                      )}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor={medication.id!.toString()}
                      className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      {medication.name}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <textarea
          onChange={(e) => setDiagnosis(e.target.value)}
          className="border rounded bg-gray-50 w-[90%] py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none resize-none"
          placeholder="Diagnosis"
          rows={5}
        />
      </div>
      <div className="w-full flex justify-end bg-[#f6f4d2] p-3">
        <Button
          onClick={onClose}
          className="w-[15%] mx-3 bg-[#8e9aaf] hover:bg-[#6f7c91] text-white font-bold py-2 px-7 rounded-3xl focus:outline-none focus:shadow-outline cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          className="w-[15%] mx-3 bg-[#8e9aaf] hover:bg-[#6f7c91] text-white font-bold py-2 px-7 rounded-3xl focus:outline-none focus:shadow-outline cursor-pointer"
          onClick={onNewMedicalRecord}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
