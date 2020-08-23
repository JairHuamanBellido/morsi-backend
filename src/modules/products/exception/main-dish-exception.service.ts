import { Injectable } from '@nestjs/common';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Restaurant } from '../../../modules/restaurants/model/restaurant.schema';
import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from '../../../modules/employees/models/employee.schema';

@Injectable()
export class MainDishExceptionService {

    constructor(
        @InjectModel(Restaurant.name)
        private readonly restaurantModel: Model<Restaurant>,

        @InjectModel(Employee.name)
        private readonly employeeModel: Model<Employee>,

        private readonly authService: AuthService,

    ) { }

    async isRestaurantOfManager(token: string, idRestaurants: Schema.Types.ObjectId[]): Promise<any> {
        const id = this.authService.decodeToken(token).id
        return (await (await this.restaurantModel.find({ _id: { $in: [...idRestaurants] }, manager: id }))).length === idRestaurants.length ? true : false
    }


    async isEmployeeExist(token:string): Promise<boolean>{
        const id = this.authService.decodeToken(token).id
        const employee = this.employeeModel.findOne({_id: id})
        return (employee) ? true : false
    }

    async isEmployeeActive(token:string): Promise<boolean> {
        const id = this.authService.decodeToken(token).id
        const employee = this.employeeModel.findOne({_id: id})
        return (await employee).active === true
    }

    async isRestaurantOfEmployee(token: string, idRestaurants: Schema.Types.ObjectId[]): Promise<any> {
        const id = this.authService.decodeToken(token);
        return (await (await this.employeeModel.find({ _id: id ,restaurant: { $in: [...idRestaurants] } }))).length > 0 ? true : false
    }
}
