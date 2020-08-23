import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { MainDishService } from './service/main-dish.service';
import { MainDishExceptionService } from './exception/main-dish-exception.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MainDishSchema, MainDish } from './models/main-dish.schema';
import { RestaurantSchema, Restaurant } from '../restaurants/model/restaurant.schema';
import { AuthModule } from '../auth/auth.module';
import { EmployeeSchema, Employee } from '../employees/models/employee.schema';
@Module({
  imports: [MongooseModule.forFeature([
    { schema: MainDishSchema, name: MainDish.name },
    { schema: RestaurantSchema, name: Restaurant.name },
    { schema: EmployeeSchema, name: Employee.name}
  ]), AuthModule],

  controllers: [ProductsController],
  providers: [MainDishService, MainDishExceptionService]
})
export class ProductsModule { }
