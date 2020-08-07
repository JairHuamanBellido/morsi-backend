import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
