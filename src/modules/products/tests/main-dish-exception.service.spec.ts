import { Test, TestingModule } from '@nestjs/testing';
import { MainDishExceptionService } from '../exception/main-dish-exception.service'
import mongoProvider from '../../../database/db.mock';
import { AuthModule } from '../../../modules/auth/auth.module';
import { MainDishService } from '../service/main-dish.service';

describe('MainDishExceptionService', () => {
  let service: MainDishExceptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [mongoProvider.initialize, mongoProvider.schemas, AuthModule],

      providers: [MainDishExceptionService, MainDishService],
    }).compile();

    service = module.get<MainDishExceptionService>(MainDishExceptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
