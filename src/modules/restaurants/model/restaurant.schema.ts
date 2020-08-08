import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Employee } from '../../../modules/employees/models/employee.schema';

@Schema()
export class Restaurant extends Document {
    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: true, type: String })
    address: string;

    @Prop({ required: true, type: String })
    city: string;

    @Prop({ required: true, type: String })
    district: string;

    @Prop({ required: true, type: String })
    country: string;

    @Prop({ required: true, type: String })
    telephoneContact: string;

    @Prop({ required: false, type: Employee, default: [] })
    employees?: Array<Employee>;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
