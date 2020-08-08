import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

    @Prop({ required: true, type: String })
    dni: string


}

export const ManagerSchema = SchemaFactory.createForClass(Manager);
