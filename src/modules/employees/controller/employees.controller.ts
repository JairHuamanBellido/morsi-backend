import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateEmployee } from '../dto/createEmployee.dto';
import { EmployeesService } from '../services/employees.service';
import { JwtAuthGuard } from '../../../core/guard/jwt-auth.guard';

@Controller('employees')
export class EmployeesController {
    constructor(private employeeService: EmployeesService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async create(@Body() employee: CreateEmployee): Promise<any> {
        return await this.employeeService.create(employee);
    }
}
