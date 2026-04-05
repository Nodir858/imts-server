import { ConflictException, Injectable } from "@nestjs/common";
import { UsersService } from "../user/users.service";
import { JwtService } from "@nestjs/jwt";
import { Role } from "../user/users.entity";

import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService{
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signup(
        username: string, 
        email: string, 
        password: string, 
        role: Role = Role.USER
    ){
        const existing = await this.usersService.findByEmail(email);
        //check is user exist
        if(existing) throw new ConflictException(`Email already in use`)
        //hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        //sending data to usersService
        //authService => handles authentication logic 
        //usersService => handles database CRUD operation
        const user = await this.usersService.create({
            username,
            email, 
            password: hashedPassword, 
            role
        });
        //return token
        //the user is automatically logged in after signup
        return this.jwtService.sign({
            username: user.username,
            email: user.email,
            role: user.role
        });
    }

    async validateUser(email: string, password: string): Promise<any>{
        return await this.usersService.findOne(email, password)
    }

    async login(user: any){
        try{
            const payload = {
                email: user.email,
                role: user.role
            }
            return{
                ...payload,
                token: this.jwtService.sign(payload)
            };
        }catch(error){
            throw new Error(`Error logging in ${error} user ${error}`)
        }
    }
}