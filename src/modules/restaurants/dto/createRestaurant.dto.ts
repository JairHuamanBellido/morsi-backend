import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRestaurant {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

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
    readonly country: string;

    @IsNotEmpty()
    @IsString()
    readonly telephoneContact: string;
}
