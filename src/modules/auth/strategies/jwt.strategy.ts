import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { jwtConstants } from "../constants/constants";


//JWT strategy how app verifies JWT tokens, it works with passport
@Injectable()
//use JWT strategy from passport
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }
    //token is decoded, payload is passed to validate(), 
    // then we are returning a user object
    async validate(payload: any){
        return {
            userId: payload.userId,
            email: payload.email
        }
    }
}