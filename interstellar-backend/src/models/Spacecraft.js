import { Schema, model } from "mongoose";
const spacecraftSchema = new Schema(
  {
    name: String,
    pricePerDay: Number,
    capacity: Number,
    image: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);
export default model("Spacecraft", spacecraftSchema);
