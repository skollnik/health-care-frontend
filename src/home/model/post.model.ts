import { Doctor } from "../../users/models/doctor.model";

export type Post = {
  id?: number;
  doctor?: Doctor;
  imgUrl: string;
  title: string;
  body: string;
};
