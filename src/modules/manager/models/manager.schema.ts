import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Restaurant } from '../../../modules/restaurants/model/restaurant.schema';

@Schema()
export class Manager extends Document {
    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: true, type: String })
    lastName: string;

    @Prop({ required: true, type: String })
    email: string;

    @Prop({ required: true, type: String })
    password: string;

    @Prop({ type: Restaurant, required: false, default: [] })
    restaurants?: Array<Restaurant>;
}

export const ManagerSchema = SchemaFactory.createForClass(Manager);
