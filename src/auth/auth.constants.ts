import * as yup from "yup";
import { DoctorSpecialty } from "../users/doctor-specialty.enum";
import { Gender } from "../users/gender.enum";

const VALID_EMAIL_FORMAT = "Field should have valid email format!";
const VALID_PASSWORD_FORMAT = "Password must be at least 6 characters!";
const REQUIRED = "Field is required!";

export const DOCTOR_REGISTRATION_VALIDATION_SCHEMA = yup.object({
  firstName: yup.string().required(REQUIRED),
  lastName: yup.string().required(REQUIRED),
  email: yup.string().email(VALID_EMAIL_FORMAT).required(REQUIRED),
  password: yup.string().min(6, VALID_PASSWORD_FORMAT).required(REQUIRED),
  specialty: yup
    .mixed<DoctorSpecialty>()
    .oneOf(Object.values(DoctorSpecialty))
    .required(REQUIRED),
});

export const PATIENT_REGISTRATION_VALIDATION_SCHEMA = yup.object({
  firstName: yup.string().required(REQUIRED),
  lastName: yup.string().required(REQUIRED),
  email: yup.string().email(VALID_EMAIL_FORMAT).required(REQUIRED),
  password: yup.string().min(6, VALID_PASSWORD_FORMAT).required(REQUIRED),
  gender: yup.mixed<Gender>().oneOf(Object.values(Gender)).required(REQUIRED),
});

export const LOGIN_VALIDATION_SCHEMA = yup.object({
  email: yup.string().email(VALID_EMAIL_FORMAT).required(REQUIRED),
  password: yup.string().min(6, VALID_PASSWORD_FORMAT).required(REQUIRED),
});

export const LOGIN_FORM_DEFAULT_VALUES = {
  email: "",
  password: "",
};
