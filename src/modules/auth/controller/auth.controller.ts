import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ManagerAuthenticate } from '../dto/authManager.dto';
import { EmployeeAuthenticate } from '../dto/authEmployee.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/manager')
    async authenticate(@Body() managerAuth: ManagerAuthenticate): Promise<any> {
        return this.authService.managerAuthenticate(managerAuth);
    }

    @Post('/employee')
    async authenticateEmployee(@Body() employeeAuth:EmployeeAuthenticate): Promise<any>{
        return this.authService.employeerAuthentication(employeeAuth)
    }


}
