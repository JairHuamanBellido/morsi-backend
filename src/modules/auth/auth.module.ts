import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagerSchema, Manager } from '../manager/models/manager.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { schema: ManagerSchema, name: Manager.name },
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
