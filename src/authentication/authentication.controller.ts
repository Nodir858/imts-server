import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/authentication.dto';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {

    constructor(private authService: AuthenticationService){}
    @Post('login')
    login(@Body() authPayload: AuthPayloadDto){
        const user = this.authService.validateUser(authPayload)
        if(!user) throw new HttpException("Invalid credentials", 401)
            return user;
    }
}
