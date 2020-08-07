import { Test, TestingModule } from '@nestjs/testing';
import { ManagerController } from '../controller/manager.controller';
import { ManagerService } from '../services/manager.service';
import mongoProvider from '../../../database/db.mock';
import { manager } from '../../../__mock__/manager.mock';
import { Manager } from '../models/manager.schema';
describe('Manager Controller', () => {
    let controller: ManagerController;
    let service: ManagerService;
    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [ManagerController],
            providers: [ManagerService],
            imports: [mongoProvider.initialize, mongoProvider.managerSchema],
        }).compile();

        service = moduleRef.get<ManagerService>(ManagerService);
        controller = moduleRef.get<ManagerController>(ManagerController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('POST /manager create', async () => {
        const _manager: Manager | any = manager;
        jest.spyOn(service, 'create').mockImplementation(() => _manager);

        expect((await _manager).name).toEqual(manager.name);
    });
});
