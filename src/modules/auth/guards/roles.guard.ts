import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../../user/users.entity";
import { ROLES_KEY } from "../decorator/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    //Reflector is used to read metadata
    constructor(private reflector: Reflector){}

    //CanActivate = security rule, forced to write this method
    canActivate(context: ExecutionContext): boolean {
        //get roles required for this route
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
            context.getHandler(),//method-level
            context.getClass(),//controller-level
        ])

        if(!requiredRoles) return true;
        //get current user from request
        const {user} = context.switchToHttp().getRequest();

        return requiredRoles.some((role) => user?.role === role);
    }

}