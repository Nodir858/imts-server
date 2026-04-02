import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

export type UsersDocument = HydratedDocument<Users>;

@Schema({timestamps: true})
export class Users {

    // @Prop()
    // id: string;

    @Prop({required: true, trim:true})
    username: string;

    @Prop({required: true, unique: true, lowercase: true, trim: true})
    email:string;

    @Prop({ required: true, select: false})
    password: string;

    @Prop({ enum: UserRole, default: UserRole.USER})
    role: string;

}

export const UsersSchema = SchemaFactory.createForClass(Users)