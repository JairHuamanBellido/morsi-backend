import { IsNotEmpty, IsString } from 'class-validator';

export class EmployeeAuthenticate {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
