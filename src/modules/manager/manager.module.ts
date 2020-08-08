import { Module } from '@nestjs/common';
import { ManagerController } from './controller/manager.controller';
import { ManagerService } from './services/manager.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagerSchema, Manager } from './models/manager.schema';
import { ManagerExceptionService } from './exception/manager-exception.service';


@Module({
    imports: [MongooseModule.forFeature([{ schema: ManagerSchema, name: Manager.name }])],
    controllers: [ManagerController],
    providers: [ManagerService, ManagerExceptionService],
    exports: [ManagerService],
})
export class ManagerModule { }
