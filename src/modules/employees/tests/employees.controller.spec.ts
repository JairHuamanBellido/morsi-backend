import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from '../controller/employees.controller';
import { EmployeesService } from '../services/employees.service';
import { RestaurantsModule } from '../../../modules/restaurants/restaurants.module';
import mongoProvider from '../../../database/db.mock';
import { EmployeeExceptionService } from '../exception/employees-exception.service';
import { AuthModule } from '../../../modules/auth/auth.module';

describe('Employees Controller', () => {
    let controller: EmployeesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [RestaurantsModule, mongoProvider.initialize, mongoProvider.schemas, AuthModule],
            controllers: [EmployeesController],
            providers: [EmployeesService, EmployeeExceptionService],
        }).compile();

        controller = module.get<EmployeesController>(EmployeesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
