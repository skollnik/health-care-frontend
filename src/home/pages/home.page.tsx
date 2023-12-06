import { Outlet } from "react-router-dom";
import { Sidebar } from "../../shared/components/sidebar";

export const HomePage = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};
