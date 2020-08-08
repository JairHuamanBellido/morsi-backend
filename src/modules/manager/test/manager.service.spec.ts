import { Test, TestingModule } from '@nestjs/testing';
import mongoProvider from '../../../database/db.mock';
import { ManagerService } from '../services/manager.service';

describe('ManagerService', () => {
    let service: ManagerService;
    const manager = {
        email: 'jair@gmail.com',
        lastName: 'Huaman',
        name: 'Jair',
        password: '123456',
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ManagerService],
            imports: [mongoProvider.initialize, mongoProvider.schemas],
        }).compile();

        service = module.get<ManagerService>(ManagerService);
    });

    it('should be defined', () => {
        expect(service).toBeTruthy();
    });

    it('should create manager', async () => {
        const _manager = service.create(manager);
        expect((await _manager).name).toEqual(manager.name);
    });
});
