import { Body, Post, Controller, UsePipes, ValidationPipe, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @UsePipes(ValidationPipe)
    @Post('/login')
    async login(@Req() req: Request){
        return await this.authService.login(req.user);
    }
}