import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Manager } from '../models/manager.schema';
import { Model } from 'mongoose';
import { CreateManager } from '../dto/createManager.dto';

@Injectable()
export class ManagerService {
    constructor(
        @InjectModel(Manager.name)
        private readonly managerModel: Model<Manager>,
    ) {}

    async create(_manager: CreateManager): Promise<Manager> {
        return await (await this.managerModel.create(_manager)).save();
    }
}
