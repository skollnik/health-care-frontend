import { useAxios } from "../useAxios";

export const useCreateAppointment = () => {
  const { axios } = useAxios();

  const createAppointment = async () => {};

  return { createAppointment };
};
