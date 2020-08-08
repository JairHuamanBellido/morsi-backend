import { Test, TestingModule } from '@nestjs/testing';
import mongoProvider from '../../../database/db.mock';
import { EmployeesService } from '../services/employees.service';
import { EmployeeExceptionService } from '../exception/employees-exception.service';
import { ManagerService } from '../../../modules/manager/services/manager.service';
import { RestaurantsService } from '../../../modules/restaurants/service/restaurants.service';
import { ManagerModule } from '../../../modules/manager/manager.module';
import { RestaurantsModule } from '../../../modules/restaurants/restaurants.module';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { AuthModule } from '../../../modules/auth/auth.module';


describe('EmployeesService', () => {
    let managerService: ManagerService;
    let restaurantService: RestaurantsService;
    let authService: AuthService;
    let employeeExceptionService: EmployeeExceptionService
    let employeeService: EmployeesService
    let token = '';
    let token2 = '';
    let mockManager: any = {
        email: 'jair@gmail.com',
        lastName: 'Huaman',
        name: 'Jair',
        password: '123456',
        dni: '123456'
    };
    let mockManager2: any = {
        email: 'jair2@gmail.com',
        lastName: 'Huaman',
        name: 'Jair2',
        password: '123456',
        dni: '888888888888'
    }
    let mockRestaurant: any = {
        name: 'Restaurante de Duke',
        address: 'Jr',
        city: 'Lima',
        district: 'Miraflores',
        country: 'Perú',
        telephoneContact: '123456',
    };
    let mockRestaurant2: any = {
        name: 'Restaurante de Cookie',
        address: 'Jr',
        city: 'Lima',
        district: 'San isidro',
        country: 'Perú',
        telephoneContact: '123456',
    }
    const mockEmployee = {
        idRestaurant: null,
        address: 'address',
        age: 12,
        city: 'c',
        district: 'd',
        dni: 'dqweqwwqe',
        email: 'email@gmail.com',
        lastname: 'l',
        name: 'n',
        nationality: 'p',
        phone: 'p',
    };
    const mockEmployee2 = {
        idRestaurant: '',
        address: 'address',
        age: 12,
        city: 'c',
        district: 'd',
        dni: 'dqweqwwqe',
        email: 'email@gmail.com',
        lastname: 'l',
        name: 'n',
        nationality: 'p',
        phone: 'p',
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [mongoProvider.initialize, mongoProvider.schemas, ManagerModule, RestaurantsModule, AuthModule],
            providers: [EmployeesService, EmployeeExceptionService],
        }).compile();

        managerService = module.get<ManagerService>(ManagerService);
        restaurantService = module.get<RestaurantsService>(RestaurantsService);
        authService = module.get<AuthService>(AuthService);
        employeeService = module.get<EmployeesService>(EmployeesService)
        employeeExceptionService = module.get<EmployeeExceptionService>(EmployeeExceptionService);

        mockManager = await managerService.create(mockManager);
        mockManager2 = await managerService.create(mockManager2);
        token = await (await authService.authenticate({ email: mockManager.email, password: mockManager.password })).access_token;
        token2 = await (await authService.authenticate({ email: mockManager2.email, password: mockManager2.password })).access_token;
        mockRestaurant.manager = mockManager._id
        mockRestaurant2.manager = mockManager2._id

        mockRestaurant = await restaurantService.create(token, mockRestaurant);
        mockRestaurant2 = await restaurantService.create(token2, mockRestaurant2)

        mockEmployee.idRestaurant = mockRestaurant._id
        mockEmployee2.idRestaurant = mockRestaurant2._id
        await employeeService.create(token, mockEmployee);
    });


    it('should be defined', () => {
        expect(employeeExceptionService).toBeDefined();
    });

    it('should exist employee', async () => {

        const _employee = await employeeExceptionService.isExist(mockEmployee.dni)
        expect(await _employee).toBeTruthy()

    });

    it('should no exist employee', async () => {
        const _noEXistEmployee = await employeeExceptionService.isExist("qweqwe")

        expect(await _noEXistEmployee).not.toBeTruthy()
    })

    it('should manager owner of restaurant', async () => {

        const restaurant = await employeeExceptionService.isRestaurantOfManager(token2, mockRestaurant2._id)
        expect(restaurant).toBeTruthy()
    });

    it('should manager is not owner of restaurant', async () => {
        const restaurant = await employeeExceptionService.isRestaurantOfManager(token, mockRestaurant2._id)
        expect(restaurant).toEqual(false)
    })

});
