import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "./users.entity";
import { Model } from "mongoose";
import { CreateUserDto } from "./dtos/create-user.dto";
import * as bcrypt from 'bcrypt'
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

    async findByEmail(email: string) : Promise<Users | null>{
        return this.userModel.findOne({
            email
        })
    }

    async findOne(email: string, password: string): Promise <Users | void>{
        try{
            const user = await this.userModel.findOne({
                where: {email},
            })
            const isMatch = await bcrypt.compare(password, user?.password);
            if(user && isMatch){
                return user
            }else{
                throw new Error(`user not found`);
            }
        }catch(error){
            throw new Error(`error finding ${error} user ${error}`)
        }
    }
    async getProfile(id: string){
        try{
            const getUser = await this.userModel.findById(id);
            if(!getUser){
                throw new Error('User not found')
            }
            return getUser;
        }catch(error){
            throw new Error(`error getting profile ${error}`)
        }
    }
}