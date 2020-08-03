import { Module } from '@nestjs/common';
import { ManagerController } from './controller/manager.controller';
import { ManagerService } from './services/manager.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagerSchema, Manager } from './models/manager.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { schema: ManagerSchema, name: Manager.name },
        ]),
    ],
    controllers: [ManagerController],
    providers: [ManagerService],
})
export class ManagerModule {}
