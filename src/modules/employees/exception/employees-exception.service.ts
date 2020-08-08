import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from '../models/employee.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmployeeExceptionService {
    constructor(
        @InjectModel(Employee.name)
        private readonly employeeModel: Model<Employee>,
    ) {}

    async isExist(dni: string): Promise<any> {
        const employee = await this.employeeModel.findOne({ dni: dni });
        return (await employee) ? true : false;
    }
}
