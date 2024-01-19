import { toast } from "react-toastify";
import { useAxios } from "../useAxios";

export const useGetAllPosts = () => {
  const { axios } = useAxios();

  const getAllPosts = async () => {
    try {
      const resp = await axios.get("/post");
      return resp.data;
    } catch (error: any) {
      toast.error("Something went wrong!", { position: "bottom-right" });
    }
  };

  return { getAllPosts };
};
