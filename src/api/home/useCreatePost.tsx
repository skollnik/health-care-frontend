import { toast } from "react-toastify";
import { useAxios } from "../useAxios";

export const useCreatePost = () => {
  const { axios } = useAxios();

  const createPost = async (post: FormData) => {
    try {
      await axios.post("/post", post, {
        headers: { "Content-Type": "mutipart/form-data" },
      });
      toast.success("Successfully created Post!", {
        position: "bottom-right",
      });
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message, { position: "bottom-right" });
      return false;
    }
  };

  return { createPost };
};
