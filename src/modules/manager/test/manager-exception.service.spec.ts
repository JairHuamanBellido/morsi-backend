import { Test, TestingModule } from '@nestjs/testing';
import mongoProvider from '../../../database/db.mock';
import { ManagerService } from '../services/manager.service';
import { ManagerExceptionService } from '../exception/manager-exception.service';

describe('ManagerExceptionService', () => {
    let managerExceptionService: ManagerExceptionService;
    let managerService: ManagerService
    const mockManager = {
        email: 'jair@gmail.com',
        lastName: 'Huaman',
        name: 'Jair',
        password: '123456',
        dni: '123456'
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ManagerService, ManagerExceptionService],
            imports: [mongoProvider.initialize, mongoProvider.schemas],
        }).compile();

        managerExceptionService = module.get<ManagerExceptionService>(ManagerExceptionService);
        managerService = module.get<ManagerService>(ManagerService)

        await managerService.create(mockManager)

    });

    it('should be defined', () => {
        expect(managerExceptionService).toBeTruthy();
    });

    it('should validate if exist manager', async () => {

        expect(await managerExceptionService.isExist("No", "no")).not.toBeTruthy()
        expect(await managerExceptionService.isExist("No", mockManager.email)).toBeTruthy()
        expect(await managerExceptionService.isExist(mockManager.dni, "no")).toBeTruthy()
        expect(await managerExceptionService.isExist(mockManager.dni, mockManager.email)).toBeTruthy()

    });
});
