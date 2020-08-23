import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../controller/products.controller';
import { MainDishExceptionService } from '../exception/main-dish-exception.service';
import { MainDishService } from '../service/main-dish.service';
import mongoProvider from '../../../database/db.mock';
import { AuthModule } from '../../../modules/auth/auth.module';

describe('Products Controller', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [mongoProvider.initialize, mongoProvider.schemas, AuthModule],
      controllers: [ProductsController],
      providers: [MainDishExceptionService, MainDishService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
