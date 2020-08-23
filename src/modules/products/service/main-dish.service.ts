import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Restaurant } from '../../../modules/restaurants/model/restaurant.schema';
import { CreateMainDish } from '../dto/createMainDish.dto';
import { MainDishExceptionService } from '../exception/main-dish-exception.service';
import { MainDish } from '../models/main-dish.schema';

@Injectable()
export class MainDishService {

    constructor(
        @InjectModel(MainDish.name)
        private readonly mainDishModel: Model<MainDish>,

        @InjectModel(Restaurant.name)
        private readonly restaurantModel: Model<Restaurant>,

        private readonly mainDishExceptionService: MainDishExceptionService
    ) { }

    async create(token: string, createMainDish: CreateMainDish): Promise<any> {
        try {
            const restaurantsTarget = await this.restaurantModel.find({ _id: { $in: [...createMainDish.restaurants] } })

            if (!await this.mainDishExceptionService.isEmployeeExist(token)){
                return new HttpException('El empleado no existe', HttpStatus.FORBIDDEN)
            }

            if (!await this.mainDishExceptionService.isEmployeeActive(token)){
                return new HttpException('El empleado no esta activado', HttpStatus.FORBIDDEN)
            }
            
            if (!await this.mainDishExceptionService.isRestaurantOfEmployee(token, createMainDish.restaurants)) {
                return new HttpException('Acceso Restringido', HttpStatus.FORBIDDEN)
            }
            

            const { restaurants = await restaurantsTarget, ...product } = createMainDish

            const mainDish = await this.mainDishModel.create({ ...product, restaurants })

            await this.addMaindDishToRestaurants(restaurantsTarget, mainDish.id)

            await mainDish.save()

            return await mainDish
        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    private async addMaindDishToRestaurants(restaurants: Restaurant[], mainDishId: Schema.Types.ObjectId): Promise<any> {
        restaurants.forEach(async (restaurant) => {
            restaurant.mainDishes = [mainDishId]
            await restaurant.updateOne(restaurant)
        })
    }
}
