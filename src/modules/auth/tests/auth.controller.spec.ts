import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controller/auth.controller';
import mongoProvider from '../../../database/db.mock';
import { AuthService } from '../services/auth.service';
import { ManagerAuthenticate } from '../dto/authManager.dto';
import { CreateManager } from '../../../modules/manager/dto/createManager.dto';
import { ManagerService } from '../../../modules/manager/services/manager.service';
import { JwtModule } from '@nestjs/jwt';
import { ManagerModule } from '../../../modules/manager/manager.module';

describe('Auth Controller', () => {
    let controller: AuthController;
    let managerService: ManagerService;
    const mockManager: CreateManager = {
        email: 'huamanbellidoj@gmail.com',
        name: 'Jair Orlando',
        lastName: 'Huaman Bellido',
        password: '123456',
        dni: '123456'
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService],
            imports: [
                mongoProvider.initialize,
                mongoProvider.schemas,
                JwtModule.register({
                    secret: 'localkey',
                }),
                ManagerModule
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        managerService = module.get<ManagerService>(ManagerService);

        await (await managerService.create(mockManager));
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('POST /auth/manager authenticate', async () => {
        const manager: ManagerAuthenticate | any = {
            email: 'huamanbellidoj@gmail.com',
            password: '123456',
        };
        const authenticate = await controller.authenticate(manager);

        expect(await authenticate).toHaveProperty('access_token');
    });
});
