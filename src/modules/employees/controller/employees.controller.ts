import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CreateEmployee } from '../dto/createEmployee.dto';
import { EmployeesService } from '../services/employees.service';
import { JwtAuthGuard } from '../../../core/guard/jwt-auth.guard';
import { Request } from 'express';

@Controller('employees')
export class EmployeesController {
    constructor(private employeeService: EmployeesService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async create(@Req() request: Request, @Body() employee: CreateEmployee): Promise<any> {
        return await this.employeeService.create(request.headers.authorization.split(' ')[1], employee);
    }
}
