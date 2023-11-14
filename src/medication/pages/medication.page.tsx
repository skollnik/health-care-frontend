import { useEffect, useState } from "react";
import Modal from "react-modal";
import { AddNewMedication } from "../components/add-new-medication.component";
import { Button } from "../../shared/components/button.component";
import { useGetAllMedications } from "../../api/medication/useGetAllMedications";
import { Medication } from "../model/medication.model";
import { MedicationTableComponent } from "../components/medication-table.component";

Modal.setAppElement("#root");

export const MedicationPage = () => {
  const { getAllMedications } = useGetAllMedications();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const loadAllMedications = async () => {
    const medications = await getAllMedications();
    setMedications(medications);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    loadAllMedications();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mt-[5%] w-[88%]">
        <h1 className="text-3xl font-bold text-center mb-10">Medication</h1>
        <Button
          onClick={openModal}
          className="bg-[#8e9aaf] hover:bg-[#6f7c91] text-white font-bold py-2 px-7 rounded-3xl focus:outline-none focus:shadow-outline cursor-pointer"
        >
          Add new medication
        </Button>
        <MedicationTableComponent
          loadAllMedications={loadAllMedications}
          medications={medications}
        />
      </div>
      <Modal
        className="w-1/2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
        isOpen={isOpen}
      >
        <AddNewMedication
          loadAllMedications={loadAllMedications}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
};
