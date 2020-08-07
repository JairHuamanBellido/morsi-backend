import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagerModule } from './modules/manager/manager.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
            load: [configuration],
        }),
        MongooseModule.forRoot(
            `${process.env.DATABASE_URL}/${process.env.DATABASE_COLLECTION}?${process.env.DATABASE_RULES}`,
        ),
        ManagerModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
