import { HttpException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/authentication.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
    {
        id: 1,
        username: 'jack',
        password: 'password',
    },
    {
        id: 2,
        username: 'nodir',
        password: 'password123'
    }
]

@Injectable()
export class AuthenticationService {

    constructor(private jwtService: JwtService){

    }

    validateUser({username, password}: AuthPayloadDto){
        const findUser = fakeUsers.find((user) => 
            user.username === username);
        if(!findUser) return null;
        if(password === findUser.password){
            const {password, ...user} = findUser;
            return this.jwtService.sign(user)
        }
    }
}
