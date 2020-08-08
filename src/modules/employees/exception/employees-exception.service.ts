import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from '../models/employee.schema';
import { Model, Schema } from 'mongoose';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Restaurant } from '../../../modules/restaurants/model/restaurant.schema';


@Injectable()
export class EmployeeExceptionService {
    constructor(
        @InjectModel(Employee.name)
        private readonly employeeModel: Model<Employee>,
        private readonly authService: AuthService,
        @InjectModel(Restaurant.name)
        private readonly restaurantModel: Model<Restaurant>

    ) { }

    async isExist(dni: string): Promise<any> {
        const employee = await this.employeeModel.findOne({ dni: dni });
        return (await employee) ? true : false;
    }

    async isRestaurantOfManager(token: string, idRestaurant: string | Schema.Types.ObjectId): Promise<any> {
        const id = (this.authService.decodeToken(token)).id;
        // console.log(await this.restaurantModel.find())
        const restaurant = await this.restaurantModel.findOne({ _id: idRestaurant, manager: id })
        // console.log(await restaurant)
        return await restaurant ? true : false

    }

}
