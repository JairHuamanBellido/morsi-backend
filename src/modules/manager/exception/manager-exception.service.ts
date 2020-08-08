import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Manager } from "../models/manager.schema";
import { Model } from "mongoose";


@Injectable()
export class ManagerExceptionService{
    constructor(
        @InjectModel(Manager.name)
        private readonly managerModel: Model<Manager>,
    ) { }


    async isExist(dni: string, email: string): Promise<any> {
        const manager = await this.managerModel.findOne({ $or:[{email: email}, {dni: dni}] })

        return await manager ? true : false
    }
}