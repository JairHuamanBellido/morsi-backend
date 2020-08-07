import { Controller, UseGuards, Post, Req, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../../core/guard/jwt-auth.guard';
import { RestaurantsService } from '../service/restaurants.service';
import { Request } from 'express';
import { CreateRestaurant } from '../dto/createRestaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
    constructor(private restaurantService: RestaurantsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async create(@Req() request: Request, @Body() restaurant: CreateRestaurant): Promise<any> {
        return await this.restaurantService.create(request.headers.authorization.split(' ')[1], restaurant);
    }
}
