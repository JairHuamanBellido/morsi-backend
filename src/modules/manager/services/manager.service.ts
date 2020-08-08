import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Manager } from '../models/manager.schema';
import { Model } from 'mongoose';
import { CreateManager } from '../dto/createManager.dto';
import { ManagerExceptionService } from "../exception/manager-exception.service";
@Injectable()
export class ManagerService {
    constructor(
        @InjectModel(Manager.name)
        private readonly managerModel: Model<Manager>,
        private managerException: ManagerExceptionService
    ) { }

    async create(_manager: CreateManager): Promise<Manager | any> {
        try {
            if (await this.managerException.isExist(_manager.dni)) {
                return new HttpException('El dni ha sido registrado', HttpStatus.CONFLICT)
            }
            const manager = this.managerModel.create(_manager);
            await (await manager).save()
            return await manager;
        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
