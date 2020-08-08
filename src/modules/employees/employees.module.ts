import { Module } from '@nestjs/common';
import { EmployeesService } from './services/employees.service';
import { EmployeesController } from './controller/employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema, Employee } from './models/employee.schema';
import { RestaurantSchema, Restaurant } from '../restaurants/model/restaurant.schema';
import { EmployeeExceptionService } from './exception/employees-exception.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { schema: EmployeeSchema, name: Employee.name },
            { schema: RestaurantSchema, name: Restaurant.name },
        ]),
    ],
    providers: [EmployeesService, EmployeeExceptionService],
    controllers: [EmployeesController],
})
export class EmployeesModule {}
