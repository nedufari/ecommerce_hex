import { SetMetadata } from "@nestjs/common";
import { Role } from "src/Enums/user-enum/user.enums";




//decorator for the admitype
export const ROLE_KEY = 'roles'
export const Roles=(...roles:Role[])=>SetMetadata(ROLE_KEY,roles);
