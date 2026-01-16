import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    workersNeeded: {
      type: Number,
      required: [true, "Number of workers needed is required"],
      min: [1, "At least 1 worker is required"],
    },
    category: {
      type: String,
      required: true,
      enum: [
        "bouncer",
        "delivery",
        "driver",
        "housekeeping",
        "cook",
        "security",
        "event-staff",
        "other",
      ],
      lowercase: true,
      default: "other",
    },
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      address: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    jobDate: {
      type: Date,
      required: true,
      set: (val) => new Date(val),
    },
    hours: {
      type: Number,
      required: true,
      min: [1, "Hours must be at least 1"],
    },
    budget: {
      type: Number,
      required: true,
      min: [1, "Budget must be greater than 0"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Client who posted
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "Accepted", "In Progress", "Fullfilled"],
      default: "Open",
    },
    acceptedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Workers who accepted
      },
    ],
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);

