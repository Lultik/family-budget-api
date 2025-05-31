import { UserRoles } from "../constants";

export interface IUser {
  id: string;
  email?: string;
  firstName: string;
  lastName: string;
  role?: UserRoles;

  password?: string;
  photo?: string;
  googleId?: string;

  createdAt?: Date;
}
