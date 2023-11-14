import { useEffect, useState } from "react";
import { Button } from "../../shared/components/button.component";
import { Medication } from "../model/medication.model";
import { useGetMedicationById } from "../../api/medication/useGetMedicationById";
import { useEditMedication } from "../../api/medication/useEditMedication";

type Props = {
  onClose: () => void;
  medicationId: number;
  loadAllMedications: () => void;
};

export const EditMedication = ({
  onClose,
  medicationId,
  loadAllMedications,
}: Props) => {
  const { getMedicationById } = useGetMedicationById();
  const { editMedication } = useEditMedication();
  const [medication, setMedication] = useState<Medication>({
    name: "",
    description: "",
  });

  const loadMedication = async () => {
    const resp = await getMedicationById(medicationId);
    setMedication(resp);
  };

  const onEditMedication = async () => {
    const resp = await editMedication(medicationId, medication!);
    if (resp) {
      loadAllMedications();
      onClose();
    }
  };

  useEffect(() => {
    loadMedication();
  }, []);

  return (
    <div className="w-full h-full rounded-md">
      <div className="w-full h-[10%] bg-[#16425b] flex items-center p-3 text-white">
        <h1 className="text-3xl">Edit medication</h1>
      </div>
      <div className="w-full flex flex-1 flex-col justify-center items-center bg-[#f6f4d2]">
        <input
          onChange={(e) =>
            setMedication((prev) => ({ ...prev!, name: e.target.value }))
          }
          value={medication?.name}
          className="border rounded bg-gray-50 w-[90%] py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none"
          id="medicationName"
          type="medicationName"
          placeholder="Medication name"
        />
        <textarea
          onChange={(e) =>
            setMedication((prev) => ({ ...prev!, description: e.target.value }))
          }
          value={medication?.description}
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
          onClick={onEditMedication}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
