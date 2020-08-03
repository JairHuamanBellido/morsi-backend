import { Controller, Post, Res, Body } from '@nestjs/common';
import { ManagerService } from '../services/manager.service';
import { CreateManager } from '../dto/createManager.dto';
import { Manager } from '../models/manager.schema';

@Controller('manager')
export class ManagerController {
    constructor(private readonly managerService: ManagerService) {}

    @Post('/')
    async create(@Body() manager: CreateManager): Promise<Manager> {
        return await this.managerService.create(manager);
    }
}
