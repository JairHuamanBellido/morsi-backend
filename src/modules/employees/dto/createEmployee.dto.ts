import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateEmployee {

    @IsNotEmpty()
    @IsString()
    readonly idRestaurant: string;

    @IsNotEmpty()
    @IsString()
    readonly dni: string;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly lastname: string;

    @IsNotEmpty()
    @IsNumber()
    readonly age: number;

    @IsNotEmpty()
    @IsString()
    readonly address: string;

    @IsNotEmpty()
    @IsString()
    readonly city: string;

    @IsNotEmpty()
    @IsString()
    readonly district: string;

    @IsNotEmpty()
    @IsString()
    readonly nationality: string;

    @IsNotEmpty()
    @IsString()
    readonly phone: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly email: string;
}
