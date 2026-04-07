import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//create a guard using the jwt strategy
//by default its name is 'jwt'
export class JwtAuthGuard extends AuthGuard('jwt') {}