import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const Events =  mongoose.model("Event", EventSchema);

export default Events;
