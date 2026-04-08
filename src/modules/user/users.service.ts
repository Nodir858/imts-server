import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "./users.entity";
import { Model } from "mongoose";
import { CreateUserDto } from "./dtos/create-user.dto";
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from "./dtos/update-user.dto";

@Injectable()
export class UsersService{

    constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>){}

    async create(createUserDto: CreateUserDto): Promise <Users>{
        try{
            const user = new this.userModel();//create new empty mongoose document
            //const hashPassword = await bcrypt.hash(createUserDto.password, 10);
            
            //fill the fields one by one
            user.username = createUserDto.username;
            user.email = createUserDto.email
            user.password = createUserDto.password;
            user.role = createUserDto.role;
            //save to Database
            return await user.save();
        }catch(error){
            throw new Error(`error creating ${error} user ${error}`)
        }
    }

    async findAll(): Promise<Users[]> {
        return this.userModel.find({
            selected: ["id", "email", "role", "createdAt"],
        });
    }

    async findById(id: string): Promise <Users | null>{
        return await this.userModel.findById(id)
    }

    //when we are use typescript promises 
    async findByEmail(email: string) : Promise<Users | null>{
        return  this.userModel.findOne({
            email
        }).select('+password')
    }


    async update(id: string, updateUserDto: UpdateUserDto) : Promise<Users | null>{
        try{
            const user = await this.userModel.findByIdAndUpdate(
                id,
                { $set: updateUserDto},
                { new: true}
            )
            if(!user) throw new NotFoundException(`user with id not found suka zyebal uje `)
            return user;
        }catch(error){
            throw new Error('error suka blet')
        }

    }
    
    async delete(id: string): Promise<any> {
        return this.userModel.deleteOne({
            _id: id
        }).exec()
    }
}