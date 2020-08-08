import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from '../../../modules/restaurants/model/restaurant.schema';
import { Model } from 'mongoose';
import { Employee } from '../models/employee.schema';
import { EmployeeExceptionService } from '../exception/employees-exception.service';
import { CreateEmployee } from '../dto/createEmployee.dto';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectModel(Restaurant.name)
        private readonly restaurantModel: Model<Restaurant>,

        @InjectModel(Employee.name)
        private readonly employeeModel: Model<Employee>,

        private readonly employeeExeception: EmployeeExceptionService,
    ) { }

    async create(token: string, newEmployee: CreateEmployee): Promise<Employee | any> {
        const { idRestaurant, ..._employee } = newEmployee;
        try {
            const restaurant = await this.restaurantModel.findOne({ _id: idRestaurant });

            if (!(await this.employeeExeception.isValidTokenOfManager(token, restaurant.id))) {
                return new HttpException('Acceso Restringido', HttpStatus.FORBIDDEN)
            }
            if (!restaurant) {
                return new HttpException('No existe el restaurante', HttpStatus.NOT_FOUND);
            }

            if (await this.employeeExeception.isExist(_employee.dni)) {
                return new HttpException('Ya existe un empleado con el mismo dni', HttpStatus.CONFLICT);
            }

            const employee = await this.employeeModel.create(_employee);

            restaurant.employees.push(employee);

            await employee.save();
            await restaurant.updateOne(restaurant);

            return await employee;
        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
