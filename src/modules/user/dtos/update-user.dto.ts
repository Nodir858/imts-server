import {IsNotEmpty, IsString, MaxLength, MinLength, Matches, IsEAN, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    username?: string;

    @IsOptional()
    @IsEmail()
    @IsString({
        message: 'Email must be a string',
    })
    email?: string;
    
    // @IsString()
    // @IsNotEmpty({
    //     message: 'Role is required',
    // })
    // role!: string;
}