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
    let employeeService: EmployeesService;
    let managerService: ManagerService;
    let restaurantService: RestaurantsService;
    let authService: AuthService;
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
        email: 'test@gmail.com',
        lastName: 'Huaman',
        name: 'Jair',
        password: '123456',
        dni: 'test'
    };

    let mockRestaurant: any = {
        name: 'Restaurante de Duke',
        address: 'Jr',
        city: 'Lima',
        district: 'Miraflores',
        country: 'Perú',
        telephoneContact: '933059431',
    };
    const mockEmployee = {
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
        password: 'w'
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

        mockManager = await managerService.create(mockManager);
        mockManager2 = await managerService.create(mockManager2);
        token = await (await authService.managerAuthenticate({ email: mockManager.email, password: mockManager.password })).access_token;
        token2 = await (await authService.managerAuthenticate({ email: mockManager2.email, password: mockManager2.password })).access_token;
        mockRestaurant = await await restaurantService.create(token, mockRestaurant);
        mockEmployee.idRestaurant = mockRestaurant._id;
    });

    it('should be defined', () => {
        expect(employeeService).toBeDefined();
    });

    it('should create employee', async () => {
        const _employee = await await employeeService.create(token, mockEmployee);

        expect(await _employee.name).toEqual(mockEmployee.name);
    });

    it('should toggle active employee account', async () => {
        const update: any = { active: false }

        expect((await employeeService.update(token, update, "no existe")).message).toEqual("Empleado no encontrado")
        expect((await employeeService.update(token2, update, mockEmployee.dni)).message).toEqual("Acceso Restringido")
        expect((await employeeService.update(token, update, mockEmployee.dni))).toBeTruthy()
    })

    it('should delete employee', async () => {

        expect((await employeeService.delete(token, "no existe")).message).toEqual("Empleado no encontrado")
        expect((await employeeService.delete(token2, mockEmployee.dni)).message).toEqual("Acceso Restringido")
        expect((await employeeService.delete(token, mockEmployee.dni)).message).toEqual("El empleado ha sido eliminado cón exito")

    })
});
