import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Manager } from '../../../modules/manager/models/manager.schema';
import { Model } from 'mongoose';
import { Restaurant } from '../model/restaurant.schema';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { CreateRestaurant } from '../dto/createRestaurant.dto';
import { RestaurantExceptionService } from '../exception/restaurants-exception.service';

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectModel(Manager.name)
        private readonly managerModel: Model<Manager>,

        @InjectModel(Restaurant.name)
        private readonly restaurantModel: Model<Restaurant>,
        private restaurantException: RestaurantExceptionService,
        private authService: AuthService,
    ) {}

    async create(token: string, newRestaurant: CreateRestaurant): Promise<any> {
        const id = this.authService.decodeToken(token).id;
        try {
            if (await this.restaurantException.isExist(newRestaurant.name)) {
                return this.restaurantException.handleError('Ya existe el restaurante');
            }

            const manager = await this.managerModel.findOne({ _id: id });
            const restaurant = await this.restaurantModel.create(newRestaurant);

            manager.restaurants.push(restaurant);

            await restaurant.save();
            await manager.updateOne(manager);

            return await restaurant;
        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
