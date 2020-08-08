import { Controller, Post, Body, UseGuards, Req, Patch, Param, Delete } from '@nestjs/common';
import { CreateEmployee } from '../dto/createEmployee.dto';
import { UpdateEmployee } from "../dto/updateEmployee.dto";
import { EmployeesService } from '../services/employees.service';
import { JwtAuthGuard } from '../../../core/guard/jwt-auth.guard';
import { Request } from 'express';
import { } from 'http';

@Controller('employees')
export class EmployeesController {
    constructor(private employeeService: EmployeesService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async create(@Req() request: Request, @Body() employee: CreateEmployee): Promise<any> {
        return await this.employeeService.create(request.headers.authorization.split(' ')[1], employee);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    async update(@Req() request: Request, @Body() employee: UpdateEmployee, @Param('id') id: string): Promise<any> {
        return await this.employeeService.update(request.headers.authorization.split(' ')[1], employee, id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Req() request: Request, @Param('id') id: string): Promise<any> {
        return await this.employeeService.delete(request.headers.authorization.split(' ')[1], id)
    }

}
