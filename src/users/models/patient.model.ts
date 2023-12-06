import { Gender } from "../gender.enum";

export type Patient = {
  id?: number;
  firstName: string;
  lastName: string;
  gender: Gender;
};
