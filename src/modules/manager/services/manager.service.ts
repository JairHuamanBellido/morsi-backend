import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Manager } from '../models/manager.schema';
import { Model } from 'mongoose';
import { CreateManager } from '../dto/createManager.dto';

@Injectable()
export class ManagerService {
    constructor(
        @InjectModel(Manager.name) private managerModel: Model<Manager>,
    ) {}

    async create(_manager: CreateManager): Promise<Manager> {
        return await this.managerModel.create(
            CreateManager.transformDTO(_manager),
        );
    }
}
