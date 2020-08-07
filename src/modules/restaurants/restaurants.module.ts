import { Module } from '@nestjs/common';
import { RestaurantsController } from './controller/restaurants.controller';
import { RestaurantsService } from './service/restaurants.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantSchema, Restaurant } from './model/restaurant.schema';
import { ManagerSchema, Manager } from '../manager/models/manager.schema';
import { AuthModule } from '../auth/auth.module';
import { RestaurantExceptionService } from './exception/restaurants-exception.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { schema: RestaurantSchema, name: Restaurant.name },
            { schema: ManagerSchema, name: Manager.name },
        ]),
        AuthModule,
    ],
    controllers: [RestaurantsController],
    providers: [RestaurantsService, RestaurantExceptionService],
})
export class RestaurantsModule {}
