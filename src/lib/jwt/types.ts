import { Role } from "@prisma/client";

export type JwtPayload = {
  id: string;
  phone: string;
  role: Role;
};
