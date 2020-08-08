import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from '../models/employee.schema';
import { Model } from 'mongoose';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Manager } from '../../../modules/manager/models/manager.schema';


@Injectable()
export class EmployeeExceptionService {
    constructor(
        @InjectModel(Employee.name)
        private readonly employeeModel: Model<Employee>,
        private readonly authService: AuthService,
        @InjectModel(Manager.name)
        private readonly managerModel: Model<Manager>

    ) { }

    async isExist(dni: string): Promise<any> {
        const employee = await this.employeeModel.findOne({ dni: dni });
        return (await employee) ? true : false;
    }


    async isValidTokenOfManager(token: string, idRestaurant: string): Promise<any> {
        const id = (this.authService.decodeToken(token)).id;
        const manager = await this.managerModel.findOne({ _id: id })

        return await manager.restaurants.find(e => e._id == idRestaurant) ? true : false

    }
}
