import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { MainDishService } from '../service/main-dish.service';
import { JwtAuthGuard } from '../../../core/guard/jwt-auth.guard';
import { CreateMainDish } from '../dto/createMainDish.dto';
import { Request } from 'express';

@Controller('products')
export class ProductsController {

    constructor(
        private mainDishService: MainDishService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('/main-dish')
    async create(@Body() createMainDish: CreateMainDish, @Req() request: Request): Promise<any> {
        return await this.mainDishService.create(request.headers.authorization.split(' ')[1], createMainDish);
    }
}
