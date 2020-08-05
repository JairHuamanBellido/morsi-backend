import { IsNotEmpty, IsString } from 'class-validator';

export class ManagerAuthenticate {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
