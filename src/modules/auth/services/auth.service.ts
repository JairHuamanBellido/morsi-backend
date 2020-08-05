import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Manager } from '../../../modules/manager/models/manager.schema';
import { Model } from 'mongoose';
import { ManagerAuthenticate } from '../dto/Authenticate.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Manager.name)
        private readonly managerModel: Model<Manager>,
    ) {}

    async authenticate(authenticate: ManagerAuthenticate): Promise<any> {
        const manager = this.managerModel.findOne({
            email: authenticate.email,
            password: authenticate.password,
        });

        return await manager;
    }
}
