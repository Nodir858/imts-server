import { SetMetadata } from "@nestjs/common";
import { Role } from "../../user/users.entity";

//this file creates decorator called Roles(), 
// you can use on routes to which user roles are allowed  to access them

//it is used to store and retrieve data
export const ROLES_KEY = 'roles';
//main part
//create a decorator called @Roles(), then accepts multiple roles using ...roles
//it takes roles 'admin' , 'user'
export const Roles = (...roles: Role[]) => {
    return SetMetadata(ROLES_KEY, roles);
}

