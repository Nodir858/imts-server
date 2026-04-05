import { Body, Controller, UsePipes,Post, ValidationPipe, UseGuards,Request, Get, Param } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    create(@Body() createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto);
    }

    @Get(':id')
    async getProfile(@Param('id') id: string){
        return this.usersService.getProfile(id);
    }
}