import { useForm } from "react-hook-form";
import { DoctorSpecialty } from "../doctor-specialty.enum";
import { yupResolver } from "@hookform/resolvers/yup";
import { DOCTOR_REGISTRATION_VALIDATION_SCHEMA } from "../../auth/auth.constants";
import { useRegisterDoctor } from "../../api/specialization/useRegisterDoctor";
import { Button } from "../../shared/components/button.component";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  specialty: DoctorSpecialty;
};

export const RegisterNewDoctor = () => {
  const { registerDoctor } = useRegisterDoctor();

  const defaultValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    specialty: DoctorSpecialty.CARDIOLOGY,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    shouldUnregister: true,
    defaultValues,
    resolver: yupResolver(DOCTOR_REGISTRATION_VALIDATION_SCHEMA),
    mode: "onChange",
  });

  const registerNewDoctor = async ({
    firstName,
    lastName,
    email,
    password,
    specialty,
  }: FormValues) => {
    await registerDoctor({ firstName, lastName, email, password, specialty });
  };

  return (
    <div className="flex flex-col items-center mt-[5%] w-[88%]">
      <h1 className="text-3xl font-bold text-center mb-10">
        Register new doctor
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
            {...register("specialty")}
            className="appearance-none border rounded bg-gray-50 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            id="grid-state"
          >
            {Object.keys(DoctorSpecialty).map((specialty) => (
              <option
                key={specialty}
                value={
                  DoctorSpecialty[specialty as keyof typeof DoctorSpecialty]
                }
              >
                {DoctorSpecialty[specialty as keyof typeof DoctorSpecialty]}
              </option>
            ))}
          </select>
          {errors.specialty && (
            <p className="text-red-500 text-xs italic">
              {errors.specialty?.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <Button
            onClick={handleSubmit(registerNewDoctor)}
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
