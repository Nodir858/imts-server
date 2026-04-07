import { Body, Post, Controller, Request,Get, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {JwtAuthGuard} from "./guards/jwt-auth.guard"
import { Role } from "../user/users.entity";
import { RolesGuard } from "./guards/roles.guard";
import { Roles } from "./decorator/roles.decorator";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    async signup(@Body() body: {
        username: string;
        email: string;
        password: string;
        role: Role
    }){
        return this.authService.signup(
            body.username, 
            body.email, 
            body.password, 
            body.role
        );
    }

    @Post('login')
    async login(@Body() body: {
        email: string;
        password: string;
    }){
        return this.authService.login(body.email, body.password);
    }

    //every authenticated user
    //runs before controller
    //authenticate this request using JWT strategy
    //passport executes JWT strategy
    //extract token from header
    //verify using secret
    //decode payload
    @UseGuards(JwtAuthGuard)
    //this gives you full request object
    //decode happening inside my strategy
    @Get('profile')
    getProfile(@Request() req){
        return req.user;
    }

    //
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.USER)
    @Get('user-dashboard')
    userDashboard(){
        return {
            message: 'Welcome User!'
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get('admin-dashboard')
    adminDashboard(){
        return {
            message: 'Welcome Admin!'
        }
    }
}