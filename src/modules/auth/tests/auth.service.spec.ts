import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { ManagerService } from '../../../modules/manager/services/manager.service';
import mongoProvider from '../../../database/db.mock';
import { CreateManager } from '../../../modules/manager/dto/createManager.dto';
import { JwtModule } from '@nestjs/jwt';
import { ManagerModule } from '../../../modules/manager/manager.module';
import { EmployeesModule } from '../../../modules/employees/employees.module';
import { RestaurantsService } from '../../../modules/restaurants/service/restaurants.service';
import { EmployeesService } from '../../../modules/employees/services/employees.service';
import { RestaurantsModule } from '../../../modules/restaurants/restaurants.module';
describe('AuthService', () => {
    let authService: AuthService;
    let managerService: ManagerService;
    let restaurantService: RestaurantsService;
    let employeeService: EmployeesService;
    const mockManager: CreateManager = {
        email: 'huamanbellidoj@gmail.com',
        name: 'Jair Orlando',
        lastName: 'Huaman Bellido',
        password: '123456',
        dni: '12345678'
    };
    let mockRestaurant: any = {
        name: "Restaurante add lof",
        address: "Jr",
        city: "Lima",
        district: "San Isidro",
        country: "Perú",
        telephoneContact: "933059431"
    }

    let token = ""

    let mockEmployee: any = {
        idRestaurant: null,
        address: "address",
        age: 12,
        city: "c",
        district: "d",
        dni: "dni8",
        email: "email@gmail.com",
        lastname: "l",
        name: "n",
        nationality: "p",
        phone: "p",
        password: "1234"
    }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                mongoProvider.initialize,
                mongoProvider.schemas,
                JwtModule.register({
                    secret: 'localkey',
                }),
                ManagerModule,
                EmployeesModule,
                RestaurantsModule
            ],
            providers: [AuthService],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        managerService = module.get<ManagerService>(ManagerService);
        restaurantService = module.get<RestaurantsService>(RestaurantsService);
        employeeService = module.get<EmployeesService>(EmployeesService);

        await managerService.create(mockManager);
        token = (await authService.managerAuthenticate({ email: mockManager.email, password: mockManager.password })).access_token
        mockRestaurant = await restaurantService.create(token, mockRestaurant);
        mockEmployee.idRestaurant = mockRestaurant.id
        await employeeService.create(token, mockEmployee)
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    it('should authenticate manager', async () => {
        expect((await authService.managerAuthenticate({ email: mockManager.email, password: "incorrecto" })).message).toEqual("Credenciales inválidas");
        expect(await authService.managerAuthenticate({ email: mockManager.email, password: mockManager.password })).toHaveProperty("access_token")
    })

    it('should authenticate employee', async () => {
        expect((await authService.employeerAuthentication({ email: mockEmployee.email, password: "incorrecto" })).message).toEqual("Credenciales inválidas")
        expect((await authService.employeerAuthentication({ email: mockEmployee.email, password: mockEmployee.password }))).toHaveProperty("access_token")

    })




});
