import { Body, Controller, UsePipes,Post, ValidationPipe, UseGuards,Request, Get, Param, ParseIntPipe, Patch, Delete } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { Roles } from "../auth/decorator/roles.decorator";
import { Role } from "./users.entity";
import { UpdateUserDto } from "./dtos/update-user.dto";
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
    findById(@Param('id') id: string){
        return this.usersService.findById(id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN, Role.USER)
    update(@Param('id') id: string, @Body() updateUserDto : UpdateUserDto){
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    remove(@Param('id') id: string){
        return this.usersService.delete(id)
    }
}