import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagerSchema, Manager } from '../modules/manager/models/manager.schema';
import { RestaurantSchema, Restaurant } from '../modules/restaurants/model/restaurant.schema';
import { EmployeeSchema, Employee } from '../modules/employees/models/employee.schema';

const mongod = new MongoMemoryServer();
export default {
    initialize: MongooseModule.forRootAsync({
        useFactory: async () => ({
            uri: await mongod.getUri(),
        }),
    }),
    schemas: MongooseModule.forFeature([
        { schema: ManagerSchema, name: Manager.name },
        { schema: RestaurantSchema, name: Restaurant.name },
        { schema: EmployeeSchema, name: Employee.name },
    ]),
};
