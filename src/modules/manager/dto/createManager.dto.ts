import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { Manager } from '../models/manager.schema';
import { Model } from 'mongoose';
export class CreateManager {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    static transformDTO(manager: CreateManager): Manager | any {
        return {
            name: manager.name,
            email: manager.email,
            lastName: manager.lastName,
            password: manager.password,
        };
    }
}
