import mongoose, { Schema } from "mongoose";

export const CommentSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    eventId: { type: Schema.Types.ObjectId, required: true, ref: "TowerEvent" },
    body: { type: String, required: true, maxLength: 1000 },
    isAttending: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})