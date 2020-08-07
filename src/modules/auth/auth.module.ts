import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagerSchema, Manager } from '../manager/models/manager.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../core/jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtKey } from '../../config/key.jwt';
@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtKey.secret,
        }),
        MongooseModule.forFeature([
            { schema: ManagerSchema, name: Manager.name },
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
