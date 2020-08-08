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
import { CreateEmployee } from '../dto/createEmployee.dto';

describe('EmployeesService', () => {
    let employeeService: EmployeesService;
    let managerService: ManagerService;
    let restaurantService: RestaurantsService;
    let authService: AuthService;
    let token = '';
    let mockManager: any = {
        email: 'jair@gmail.com',
        lastName: 'Huaman',
        name: 'Jair',
        password: '123456',
    };
    let mockRestaurant: any = {
        name: 'Restaurante de Duke',
        address: 'Jr',
        city: 'Lima',
        district: 'Miraflores',
        country: 'Perú',
        telephoneContact: '933059431',
    };
    const mockEmployee: CreateEmployee = {
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

        employeeService = module.get<EmployeesService>(EmployeesService);
        managerService = module.get<ManagerService>(ManagerService);
        restaurantService = module.get<RestaurantsService>(RestaurantsService);
        authService = module.get<AuthService>(AuthService);

        mockManager = await await managerService.create(mockManager);
        token = await (await authService.authenticate({ email: mockManager.email, password: mockManager.password })).access_token;
        mockRestaurant = await await restaurantService.create(token, mockRestaurant);
        mockEmployee.idRestaurant = mockRestaurant._id;
    });

    it('should be defined', () => {
        expect(employeeService).toBeDefined();
    });

    it('should create employee', async () => {
        const _employee = await await employeeService.create(mockEmployee);

        expect(await _employee.name).toEqual(mockEmployee.name);
    });
});
