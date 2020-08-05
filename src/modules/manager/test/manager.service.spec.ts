import { Test, TestingModule } from '@nestjs/testing';
import { ManagerService } from '../services/manager.service';
import mockManager from '../__mock__/manager.mock';
import mongoProvider from '../../../database/db.mock';

describe('ManagerService', () => {
    let service: ManagerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ManagerService],
            imports: [mongoProvider.initialize, mongoProvider.managerSchema],
        }).compile();

        service = module.get<ManagerService>(ManagerService);
    });

    it('should be defined', () => {
        expect(service).toBeTruthy();
    });

    it('should create manager', async () => {
        const manager = service.create(mockManager);
        expect((await manager).name).toEqual(mockManager.name);
    });
});
