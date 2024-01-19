import { Button } from "../../shared/components/button.component";
import { Post } from "../model/post.model";

type Props = {
  onClose: () => void;
  post: Post;
};

export const PostModal = ({ onClose, post }: Props) => {
  return (
    <div className="w-full h-full rounded-md">
      <div className="w-full bg-[#16425b] flex items-center p-3 text-white">
        <h1 className="text-3xl">{post.title}</h1>
      </div>
      <div className="w-full bg-[#f6f4d2] flex justify-center pt-3 h-[300px] max-h-[300px]">
        <img className="w-[50%] h-full" src={post.imgUrl} alt="" />
      </div>
      <div className="w-full bg-[#f6f4d2] flex justify-center p-3 max-h-[300px] overflow-y-auto no-scrollbar">
        {post.body}
      </div>
      <div className="w-full flex justify-end bg-[#f6f4d2] p-3">
        <Button
          onClick={onClose}
          className="w-[15%] mx-3 bg-[#8e9aaf] hover:bg-[#6f7c91] text-white font-bold py-2 px-7 rounded-3xl focus:outline-none focus:shadow-outline cursor-pointer"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
