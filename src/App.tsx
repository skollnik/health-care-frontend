import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sidebar } from "./shared/components/sidebar";

function App() {
  return (
    <div className="flex relative w-full h-screen max-h-screen bg-[#f6f4d2]">
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
