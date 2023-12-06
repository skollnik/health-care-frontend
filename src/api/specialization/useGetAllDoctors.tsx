import React from "react";
import { useAxios } from "../useAxios";
import { toast } from "react-toastify";

export const useGetAllDoctors = () => {
  const { axios } = useAxios();
  const getAllDoctors = async () => {
    try {
      const resp = await axios.get("/specialization/doctors");
      return resp.data;
    } catch (error: any) {
      toast.error("Something went wrong!", { position: "bottom-right" });
    }
  };
  return { getAllDoctors };
};
