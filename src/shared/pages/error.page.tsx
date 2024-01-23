import { DoctorErrorIcon } from "../icons";

export const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f6f4d2]">
      <h1 className="font-bold text-9xl">404</h1>
      <div className="flex items-center justify-center">
        <DoctorErrorIcon />
        <p className="text-xl">The page you were looking for does not exist</p>
      </div>
    </div>
  );
};
