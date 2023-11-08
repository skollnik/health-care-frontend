import { Sidebar } from "../../shared/components/sidebar";
import { useApplicationStore } from "../../store/application.store";

export const HomePage = () => {
  const user = useApplicationStore((state) => state.user);
  return (
    <>
      <Sidebar />
    </>
  );
};
