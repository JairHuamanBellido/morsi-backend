import { Test, TestingModule } from '@nestjs/testing';
import { ManagerService } from '../services/manager.service';

describe('ManagerService', () => {
  let service: ManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerService],
    }).compile();

    service = module.get<ManagerService>(ManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
