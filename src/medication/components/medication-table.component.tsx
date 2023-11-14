import { useState } from "react";
import { useDeleteMedication } from "../../api/medication/useDeleteMedication";
import { Button } from "../../shared/components/button.component";
import { Medication } from "../model/medication.model";
import Modal from "react-modal";
import { EditMedication } from "./edit-medication.compontent";

type Props = {
  medications: Medication[];
  loadAllMedications: () => void;
};

export const MedicationTableComponent = ({
  medications,
  loadAllMedications,
}: Props) => {
  const { deleteMedication } = useDeleteMedication();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [medicationId, setMedicationId] = useState<number>(-1);

  const openModal = (id: number) => {
    setMedicationId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onDeleteMedication = async (id: number) => {
    const resp = await deleteMedication(id);
    if (resp) loadAllMedications();
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 w-[70%]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-100 uppercase bg-[#16425b]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {medications.map((medication) => (
              <tr
                key={medication.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {medication.name}
                </th>
                <td className="px-6 py-4">{medication.description}</td>
                <td className="px-6 py-4">
                  <Button
                    className="hover:underline hover:text-gray-200"
                    onClick={() => openModal(medication.id!)}
                  >
                    Edit
                  </Button>
                </td>
                <td className="px-6 py-4">
                  <Button
                    className="hover:underline hover:text-gray-200"
                    onClick={() => onDeleteMedication(medication.id!)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        className="w-1/2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
        isOpen={isOpen}
      >
        <EditMedication
          medicationId={medicationId}
          loadAllMedications={loadAllMedications}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
};
