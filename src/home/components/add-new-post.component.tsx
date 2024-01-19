import { useState } from "react";
import { Button } from "../../shared/components/button.component";
import { useCreatePost } from "../../api/home/useCreatePost";
import { toast } from "react-toastify";

type Props = {
  onClose: () => void;
};

export const AddNewPost = ({ onClose }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [image, setImage] = useState<any>();

  const { createPost } = useCreatePost();

  const onAddNewPost = async () => {
    if (title.trim() === "" || body.trim() === "" || !image) {
      toast.error("Fields should not be empty!", { position: "bottom-right" });
      return;
    }

    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("title", title.trim());
    formData.append("body", body.trim());

    const resp = await createPost(formData);

    if (resp) {
      onClose();
    }
  };

  return (
    <div className="w-full h-full rounded-md">
      <div className="w-full h-[10%] bg-[#16425b] flex items-center p-3 text-white">
        <h1 className="text-3xl">Add new Post</h1>
      </div>
      <div className="w-full flex flex-1 flex-col justify-center items-center bg-[#f6f4d2]">
        <input
          onChange={(e) => setImage(e.target.files)}
          className="border rounded bg-gray-50 w-[90%] my-5 text-gray-700 leading-tight focus:outline-none block text-sm cursor-pointer "
          id="file_input"
          type="file"
        />

        <input
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded bg-gray-50 w-[90%] py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none"
          id="postTitle"
          type="postTitle"
          placeholder="Title"
        />
        <textarea
          onChange={(e) => setBody(e.target.value)}
          className="border rounded bg-gray-50 w-[90%] py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none resize-none"
          placeholder="Body"
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
          onClick={onAddNewPost}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
