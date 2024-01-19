import { PostsComponent } from "../components/posts.component";

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center mt-[5%] w-[88%]">
      <PostsComponent />
    </div>
  );
};
