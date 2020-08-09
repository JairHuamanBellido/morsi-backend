import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from '../service/restaurants.service';
import mongoProvider from '../../../database/db.mock';
import { AuthModule } from '../../../modules/auth/auth.module';
import { RestaurantExceptionService } from '../exception/restaurants-exception.service';
import { ManagerModule } from '../../../modules/manager/manager.module';
import { ManagerService } from '../../../modules/manager/services/manager.service';
import { AuthService } from '../../../modules/auth/services/auth.service';

describe('RestaurantsService', () => {
    let restaurantService: RestaurantsService;
    let managerService: ManagerService;
    let authService: AuthService;
    let mockManager = {
        email: 'jair@gmail.com',
        lastName: 'Huaman',
        name: 'Jair',
        password: '123456',
        dni: '123456'
    };
    let token = '';
    const mockRestaurant = {
        name: 'Restaurante de Duke',
        address: 'Jr',
        city: 'Lima',
        district: 'Miraflores',
        country: 'Perú',
        telephoneContact: '933059431',
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AuthModule, mongoProvider.initialize, mongoProvider.schemas, ManagerModule],
            providers: [RestaurantsService, RestaurantExceptionService],
        }).compile();

        restaurantService = module.get<RestaurantsService>(RestaurantsService);
        managerService = module.get<ManagerService>(ManagerService);
        authService = module.get<AuthService>(AuthService);

        mockManager = await (await managerService.create(mockManager)).save();
        token = await (await authService.managerAuthenticate({ email: mockManager.email, password: mockManager.password })).access_token;
    });

    it('should be defined', () => {
        expect(restaurantService).toBeDefined();
    });

    it('should create restaurant', async () => {
        const _restaurant = await restaurantService.create(token, mockRestaurant);
        await _restaurant;
        expect((await _restaurant).name).toEqual(mockRestaurant.name);
    });
});
