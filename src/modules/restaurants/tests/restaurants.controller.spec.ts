import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from '../controller/restaurants.controller';
import { RestaurantsService } from '../service/restaurants.service';
import mongoProvider from '../../../database/db.mock';
import { RestaurantExceptionService } from '../exception/restaurants-exception.service';
import { AuthModule } from '../../../modules/auth/auth.module';

describe('Restaurants Controller', () => {
    let controller: RestaurantsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [mongoProvider.initialize, mongoProvider.schemas, AuthModule],
            controllers: [RestaurantsController],
            providers: [RestaurantsService, RestaurantExceptionService],
        }).compile();

        controller = module.get<RestaurantsController>(RestaurantsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
