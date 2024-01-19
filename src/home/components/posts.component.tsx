import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useGetAllPosts } from "../../api/home/useGetAllPosts";
import { Button } from "../../shared/components/button.component";
import { useApplicationStore } from "../../store/application.store";
import { Post as PostModel } from "../model/post.model";
import { AddNewPost } from "./add-new-post.component";
import { Post } from "./post.component";

Modal.setAppElement("#root");

export const PostsComponent = () => {
  const user = useApplicationStore((state) => state.user);
  const { getAllPosts } = useGetAllPosts();
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const loadAllPosts = async () => {
    const posts = await getAllPosts();
    setPosts(posts);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    loadAllPosts();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-10">Posts</h1>
      {user?.role === "DOCTOR" ? (
        <Button
          onClick={openModal}
          className="bg-[#8e9aaf] hover:bg-[#6f7c91] text-white font-bold py-2 px-7 rounded-3xl focus:outline-none focus:shadow-outline cursor-pointer"
        >
          New Post
        </Button>
      ) : null}
      <div className="w-full h-4/5 overflow-y-auto flex flex-col items-center mt-10">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <Modal
        className="w-1/2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
        isOpen={isOpen}
      >
        <AddNewPost onClose={closeModal} />
      </Modal>
    </>
  );
};
