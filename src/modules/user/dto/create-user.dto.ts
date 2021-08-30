import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto{
    @IsEmail()
    readonly email: string;

    @IsString()
    password: string;

    @IsString()
    readonly name: string;

    @IsOptional()
    readonly displayed_name: string;
}