import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UserUpdateDto {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name?: string;
}