import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ManagerAuthenticate } from '../dto/authManager.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/manager')
    async authenticate(@Body() managerAuth: ManagerAuthenticate): Promise<any> {
        return this.authService.managerAuthenticate(managerAuth);
    }


}
