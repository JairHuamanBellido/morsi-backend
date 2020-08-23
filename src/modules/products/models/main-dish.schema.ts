import { Schema, Prop, SchemaFactory, } from '@nestjs/mongoose';
import { Document, Schema as schema } from 'mongoose';


@Schema()
export class MainDish extends Document {
    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: true, type: Number })
    price: number;

    @Prop({ required: true, type: String })
    description: string;

    @Prop({ required: false, type: Boolean, default: true })
    active?: boolean;

    @Prop({ required: false, type: Number, default: 0 })
    discount?: number

    @Prop({ required: true, type: [schema.Types.ObjectId], ref: 'Restaurant' })
    restaurants: [schema.Types.ObjectId]

}

export const MainDishSchema = SchemaFactory.createForClass(MainDish)