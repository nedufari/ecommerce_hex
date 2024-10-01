import { SetMetadata } from "@nestjs/common";
import { Role } from "src/Enums/user-dto/shared-dto/user.enums";



//decorator for the admitype
export const ROLE_KEY = 'roles'
export const Roles=(...roles:Role[])=>SetMetadata(ROLE_KEY,roles);
