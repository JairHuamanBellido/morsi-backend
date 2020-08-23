import { Test, TestingModule } from '@nestjs/testing';
import { MainDishService } from '../service/main-dish.service';
import mongoProvider from '../../../database/db.mock';
import { MainDishExceptionService } from '../exception/main-dish-exception.service';
import { AuthModule } from '../../../modules/auth/auth.module';

describe('MainDishService', () => {
  let service: MainDishService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [mongoProvider.initialize, mongoProvider.schemas, AuthModule],
      providers: [MainDishService, MainDishExceptionService],
    }).compile();

    service = module.get<MainDishService>(MainDishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
