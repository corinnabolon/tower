import mongoose, { Schema } from "mongoose";

export const TowerEventSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 50 },
    description: { type: String, required: true, maxLength: 1000 },
    coverImg: { type: String, required: true, maxLength: 300 },
    location: { type: String, required: true, maxLength: 30 },
    capacity: { type: Number, required: true, maxLength: 5 },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: true, default: false },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true, default: 'concert' },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TowerEventSchema.virtual("creator", {
  localField: "creatorId",
  ref: "Account",
  foreignField: "_id",
  justOne: true
})

TowerEventSchema.virtual('ticketCount', {
  localField: "_id",
  ref: "Ticket",
  foreignField: "eventId",
  count: true
})