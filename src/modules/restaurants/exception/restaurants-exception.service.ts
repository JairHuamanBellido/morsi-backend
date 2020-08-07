import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from '../model/restaurant.schema';
import { Model } from 'mongoose';

@Injectable()
export class RestaurantExceptionService {
    constructor(
        @InjectModel(Restaurant.name)
        private readonly restaurantModel: Model<Restaurant>,
    ) {}

    async isExist(name: string): Promise<any> {
        const restaurant = await this.restaurantModel.findOne({ name: name });
        return await restaurant;
    }

    handleError(message: string): any {
        return new HttpException(message, HttpStatus.CONFLICT);
    }
}
