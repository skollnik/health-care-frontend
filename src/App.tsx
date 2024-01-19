import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Sidebar } from "./shared/components/sidebar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex relative w-full h-screen max-h-screen bg-[#f6f4d2]">
        <Sidebar />
        <Outlet />
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
