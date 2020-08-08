import { Document, Schema as schema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Employee extends Document {
    @Prop({ required: true, type: String })
    dni: string;

    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: true, type: String })
    lastname: string;

    @Prop({ required: true, type: Number })
    age: number;

    @Prop({ required: true, type: String })
    address: string;

    @Prop({ required: true, type: String })
    city: string;

    @Prop({ required: true, type: String })
    district: string;

    @Prop({ required: true, type: String })
    nationality: string;

    @Prop({ required: true, type: String })
    phone: string;

    @Prop({ required: true, type: String })
    email: string;

    @Prop({ required: false, type: Boolean, default: true })
    active?: boolean;

    @Prop({ required: true, type: schema.Types.ObjectId, ref: 'Restaurant' })
    restaurant: schema.Types.ObjectId
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
