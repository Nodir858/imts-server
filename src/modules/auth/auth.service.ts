import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../user/users.service";
import { JwtService } from "@nestjs/jwt";
import { Role } from "../user/users.entity";
import * as bcrypt from 'bcrypt';

//JWT (JSON Web Token)
//it is like digital ID card that your server gives to the user after login and signup
//why we need generateToken()= to prove the user is logged in
//token contains user info (payload)
//user ID, email, role
//client sends token in every request
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
        return this.generateToken(user);

        
    }

    async login(email: string, password: string){
        try{
            const user = await this.usersService.findByEmail(email);
            if(!user || !(await bcrypt.compare(password, user.password))){
                throw new UnauthorizedException('Invalid credentials')
            }

            return this.generateToken(user);
        }catch(error){
            throw new Error(`Error logging in ${error} user ${error}`)
        }
    }

    //we are storing data inside the payload object 
        private generateToken(user : any){
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
