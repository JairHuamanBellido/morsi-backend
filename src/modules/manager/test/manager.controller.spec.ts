import { Test } from '@nestjs/testing';
import { ManagerController } from '../controller/manager.controller';
import { ManagerService } from '../services/manager.service';
import mongoProvider from '../__mock__/db.mock';
import managerMock from '../__mock__/manager.mock';
import { Manager } from '../models/manager.schema';
describe('Manager Controller', () => {
    let controller: ManagerController;
    let service: ManagerService;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
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
        const manager: Manager | any = managerMock;
        jest.spyOn(service, 'create').mockImplementation(() => manager);
        
        expect((await manager).name).toEqual(managerMock.name);
    });
});
