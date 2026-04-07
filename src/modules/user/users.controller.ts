import { Body, Controller, UsePipes,Post, ValidationPipe, UseGuards,Request, Get, Param, ParseIntPipe } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { Roles } from "../auth/decorator/roles.decorator";
import { Role } from "./users.entity";
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    
    @Get()
    @Roles(Role.ADMIN)
    findAll(){
        return this.usersService.findAll()
    }

    @Get(':id')
    @Roles(Role.ADMIN, Role.USER)
    findOne(@Param('id') id: string){
        return this.usersService.findOne(id);
    }
}