import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument} from 'mongoose';

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export type UsersDocument = HydratedDocument<Users>;

@Schema({timestamps: true, collection: 'users'})
export class Users {

    @Prop({required: true, trim:true})
    username!: string;

    @Prop({required: true, unique: true, lowercase: true, trim: true})
    email!:string;

    @Prop({ required: true, select: false})
    password!: string;

    @Prop({ enum: Role, default: Role.USER})
    role!: string;

}

export const UsersSchema = SchemaFactory.createForClass(Users)