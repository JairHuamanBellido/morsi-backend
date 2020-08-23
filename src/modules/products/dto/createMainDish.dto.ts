import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { Schema } from "mongoose";

export class CreateMainDish {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    readonly restaurants: [Schema.Types.ObjectId]

    readonly active?: boolean;

    readonly discount?: number

}