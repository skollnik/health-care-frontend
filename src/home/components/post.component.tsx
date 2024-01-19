import { CSSProperties, useState } from "react";
import Modal from "react-modal";
import { Button } from "../../shared/components/button.component";
import { RightArrowIcon } from "../../shared/icons";
import { Post as PostModel } from "../model/post.model";
import { PostModal } from "./post-modal.component";

type Props = {
  post: PostModel;
};

const style: CSSProperties = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  WebkitLineClamp: 3,
};

export const Post = ({ post }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="max-w-[40rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-[5%]">
        <div className="w-full h-10 flex items-center">
          <p className="ml-3 text-gray-200">
            {post.doctor?.firstName} {post.doctor?.lastName} - [
            {post.doctor?.specialty}]
          </p>
        </div>
        <img className="w-full" src={post.imgUrl} alt="" />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
          <p
            className="mb-3 font-normal text-gray-700 dark:text-gray-400"
            style={style}
          >
            {post.body}
          </p>
          <Button
            className="flex items-center justify-center mx-3 bg-[#8e9aaf] hover:bg-[#6f7c91] text-white font-bold py-2 px-7 rounded-3xl focus:outline-none focus:shadow-outline cursor-pointer"
            onClick={openModal}
          >
            Read more
            <RightArrowIcon />
          </Button>
        </div>
      </div>
      <Modal
        className="w-1/2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
        isOpen={isOpen}
      >
        <PostModal onClose={closeModal} post={post} />
      </Modal>
    </>
  );
};
