import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagerSchema, Manager } from '../modules/manager/models/manager.schema';

const mongod = new MongoMemoryServer();
export default {
    initialize: MongooseModule.forRootAsync({
        useFactory: async () => ({
            uri: await mongod.getUri(),
        }),
    }),
    managerSchema: MongooseModule.forFeature([
        { schema: ManagerSchema, name: Manager.name },
    ]),
};
