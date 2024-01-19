import { useNavigate } from "react-router-dom";
import { HealthCareIcon } from "../../shared/icons";
import { useApplicationStore } from "../../store/application.store";
import { useForm } from "react-hook-form";
import {
  LOGIN_FORM_DEFAULT_VALUES,
  LOGIN_VALIDATION_SCHEMA,
} from "../auth.constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../shared/components/button.component";

type FormValues = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const signIn = useApplicationStore((state) => state.login);

  const {
    handleSubmit,
    formState: { errors, isValid },
    register,
  } = useForm<FormValues>({
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
    resolver: yupResolver(LOGIN_VALIDATION_SCHEMA),
    mode: "onChange",
  });

  const login = async ({ email, password }: FormValues) => {
    const { user } = await signIn({ email, password });
    if (user) {
      navigate("/home");
      return;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(login)();
    }
  };

  return (
    <div className="w-full h-screen bg-[#f6f4d2]">
      <div
        onKeyDown={(e) => handleKeyDown(e)}
        className="flex absolute w-[40%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-lg"
      >
        <div className="bg-[#ede7e3] w-[50%] p-10">
          <h1 className="text-3xl font-bold text-center mb-10">Login</h1>
          <form>
            <div className="mb-4">
              <input
                {...register("email")}
                className="border rounded bg-gray-50 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="email"
                type="email"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <input
                {...register("password")}
                className="border rounded bg-gray-50 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="password"
                type="password"
                placeholder="**********"
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-center">
              <Button
                onClick={handleSubmit(login)}
                disabled={!isValid}
                className="bg-[#8e9aaf] hover:bg-[#6f7c91] text-white font-bold py-2 px-7 rounded-3xl focus:outline-none focus:shadow-outline cursor-pointer"
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>
        <div className="w-[50%] bg-[#82c0cc] p-10 flex flex-col items-center">
          <h1 className="text-xl font-bold">Healthcare</h1>
          <p>Take care of your health.</p>
          <HealthCareIcon />
        </div>
      </div>
    </div>
  );
};
