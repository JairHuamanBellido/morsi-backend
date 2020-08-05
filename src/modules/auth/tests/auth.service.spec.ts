import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { ManagerService } from '../../../modules/manager/services/manager.service';
import mongoProvider from '../../../database/db.mock';
import { CreateManager } from '../../../modules/manager/dto/createManager.dto';
describe('AuthService', () => {
    let authService: AuthService;
    let managerService: ManagerService;
    const mockManager: CreateManager = {
        email: 'huamanbellidoj@gmail.com',
        name: 'Jair Orlando',
        lastName: 'Huaman Bellido',
        password: '123456',
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [mongoProvider.initialize, mongoProvider.managerSchema],
            providers: [AuthService, ManagerService],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        managerService = module.get<ManagerService>(ManagerService);
        await (await managerService.create(mockManager)).save();
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    it('should Authenticate', async () => {
        const auth = await authService.authenticate({
            email: mockManager.email,
            password: mockManager.password,
        });

        expect((await auth).name).toEqual(mockManager.name);
    });
});
