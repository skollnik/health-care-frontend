import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRegisterPatient } from "../../api/specialization/useRegisterPatient";
import { PATIENT_REGISTRATION_VALIDATION_SCHEMA } from "../../auth/auth.constants";
import { Button } from "../../shared/components/button.component";
import { Gender } from "../gender.enum";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: Gender;
};

export const RegisterNewPatient = () => {
  const { registerPatient } = useRegisterPatient();

  const defaultValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: Gender.MALE,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    shouldUnregister: true,
    defaultValues,
    resolver: yupResolver(PATIENT_REGISTRATION_VALIDATION_SCHEMA),
    mode: "onChange",
  });

  const registerNewPatient = async ({
    firstName,
    lastName,
    email,
    password,
    gender,
  }: FormValues) => {
    await registerPatient({ firstName, lastName, email, password, gender });
  };

  return (
    <div className="flex flex-col items-center mt-[5%] w-[88%]">
      <h1 className="text-3xl font-bold text-center mb-10">
        Register new patient
      </h1>
      <form className="w-[20%]">
        <div className="mb-4">
          <input
            {...register("firstName")}
            className="border rounded bg-gray-50 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            id="firstName"
            type="text"
            placeholder="First name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs italic">
              {errors.firstName?.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            {...register("lastName")}
            className="border rounded bg-gray-50 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            id="lastName"
            type="text"
            placeholder="Last name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs italic">
              {errors.lastName?.message}
            </p>
          )}
        </div>
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
        <div className="mb-6">
          <select
            {...register("gender")}
            className="w-full border rounded bg-gray-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            id="grid-state"
          >
            {Object.keys(Gender).map((gender) => (
              <option
                key={gender}
                value={Gender[gender as keyof typeof Gender]}
              >
                {Gender[gender as keyof typeof Gender]}
              </option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs italic">
              {errors.gender?.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <Button
            onClick={handleSubmit(registerNewPatient)}
            disabled={!isValid}
            className="bg-[#8e9aaf] hover:bg-[#6f7c91] text-white font-bold py-2 px-7 rounded-3xl focus:outline-none focus:shadow-outline cursor-pointer"
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};
