import { useState } from "react";
import { useAddNewMedication } from "../../api/medication/useAddNewMedication";
import { Button } from "../../shared/components/button.component";
import { toast } from "react-toastify";

type Props = {
  onClose: () => void;
  loadAllMedications: () => void;
};

export const AddNewMedication = ({ onClose, loadAllMedications }: Props) => {
  const [medicationName, setMedicationName] = useState<string>("");
  const [medicationDescription, setMedicationDescription] =
    useState<string>("");

  const { addNewMedication } = useAddNewMedication();

  const onAddNewMedication = async () => {
    if (medicationName.trim() === "" || medicationDescription.trim() === "") {
      toast.error("Fields should not be empty!", { position: "bottom-right" });
      return;
    }
    const resp = await addNewMedication({
      name: medicationName.trim(),
      description: medicationDescription.trim(),
    });
    if (resp) {
      loadAllMedications();
    }
    onClose();
  };

  return (
    <div className="w-full h-full rounded-md">
      <div className="w-full h-[10%] bg-[#16425b] flex items-center p-3 text-white">
        <h1 className="text-3xl">Add new medication</h1>
      </div>
      <div className="w-full flex flex-1 flex-col justify-center items-center bg-[#f6f4d2]">
        <input
          onChange={(e) => setMedicationName(e.target.value)}
          className="border rounded bg-gray-50 w-[90%] py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none"
          id="medicationName"
          type="medicationName"
          placeholder="Medication name"
        />
        <textarea
          onChange={(e) => setMedicationDescription(e.target.value)}
          className="border rounded bg-gray-50 w-[90%] py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none resize-none"
          placeholder="Medication description"
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
          onClick={onAddNewMedication}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
