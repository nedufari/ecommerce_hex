import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

import { ROLE_KEY } from "../Decorators/role.decorator";
import { Role } from "src/Enums/user-enum/user.enums";



// GUARD FOR THE Roleguard
@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log('RoleGuard executed');
        
        const requiredRoles=this.reflector.getAllAndOverride<Role[]>(ROLE_KEY,[
            context.getHandler(),
            context.getClass()
        ])
        if (!requiredRoles){
            return true
        }
        const {user}=context.switchToHttp().getRequest();
        return requiredRoles.some(role=>user.role === role);
    }
        
    }