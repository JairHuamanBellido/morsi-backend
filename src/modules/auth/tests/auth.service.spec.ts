import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { ManagerService } from '../../../modules/manager/services/manager.service';
import mongoProvider from '../../../database/db.mock';
import { CreateManager } from '../../../modules/manager/dto/createManager.dto';
import { JwtModule } from '@nestjs/jwt';
import { ManagerModule } from '../../../modules/manager/manager.module';
describe('AuthService', () => {
    let authService: AuthService;
    let managerService: ManagerService;
    const mockManager: CreateManager = {
        email: 'huamanbellidoj@gmail.com',
        name: 'Jair Orlando',
        lastName: 'Huaman Bellido',
        password: '123456',
        dni: '12345678'
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                mongoProvider.initialize,
                mongoProvider.schemas,
                JwtModule.register({
                    secret: 'localkey',
                }),
                ManagerModule
            ],
            providers: [AuthService],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        managerService = module.get<ManagerService>(ManagerService);
        await (await managerService.create(mockManager));
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

});
