import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from '../../../modules/restaurants/model/restaurant.schema';
import { Model } from 'mongoose';
import { Employee } from '../models/employee.schema';
import { EmployeeExceptionService } from '../exception/employees-exception.service';
import { CreateEmployee } from '../dto/createEmployee.dto';
import { UpdateEmployee } from '../dto/updateEmployee.dto';

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

            if (!(await this.employeeExeception.isRestaurantOfManager(token, restaurant.id))) {
                return new HttpException('Acceso Restringido', HttpStatus.FORBIDDEN)
            }

            if (!restaurant) {
                return new HttpException('No existe el restaurante', HttpStatus.NOT_FOUND);
            }

            if (await this.employeeExeception.isExist(_employee.dni)) {
                return new HttpException('Ya existe un empleado con el mismo dni', HttpStatus.CONFLICT);
            }

            const employee = await this.employeeModel.create({ ..._employee, restaurant });

            await employee.save();

            return await employee;
        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(token: string, _employee: UpdateEmployee, dni: string): Promise<any> {

        try {
            const employee = await this.employeeModel.findOne({ dni: dni })

            if (!(await this.employeeExeception.isExist(dni))) {
                return new HttpException('Empleado no encontrado', HttpStatus.NOT_FOUND)
            }
            if (!(await this.employeeExeception.isRestaurantOfManager(token, await employee.restaurant))) {
                return new HttpException('Acceso Restringido', HttpStatus.FORBIDDEN)
            }

            await employee.updateOne(_employee)

            return { "message": "se ha actualizado con exito" }

        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async delete(token: string, dni: string): Promise<any> {
        try {
            const employee = await this.employeeModel.findOne({ dni: dni })

            if (!(await this.employeeExeception.isExist(dni))) {
                return new HttpException('Empleado no encontrado', HttpStatus.NOT_FOUND)
            }

            if (!(await this.employeeExeception.isRestaurantOfManager(token, await employee.restaurant))) {
                return new HttpException('Acceso Restringido', HttpStatus.FORBIDDEN)
            }

            await this.employeeModel.deleteOne({ dni: dni })

            return { "message": "El empleado ha sido eliminado cón exito" }

        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
