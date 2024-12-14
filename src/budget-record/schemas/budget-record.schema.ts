import * as crypto from "node:crypto";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { HydratedDocument } from "mongoose";

export type BudgetRecordDocument = HydratedDocument<BudgetRecord>;

@Schema({ collection: "budget", timestamps: true, id: true })
export class BudgetRecord {
  @Prop({ id: true, default: () => crypto.randomUUID() })
  id: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  category: string;

  @Prop()
  description?: string;

  @Prop()
  timestamp?: string;

  @Prop()
  createdBy?: string;

  @Prop()
  discount?: number;

  @Prop({ default: null })
  deletedAt: Date;
}

export const BudgetRecordSchema = SchemaFactory.createForClass(BudgetRecord);
