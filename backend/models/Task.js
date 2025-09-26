import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: { 
     type: mongoose.Schema.Types.ObjectId,
     ref: "User" 
        },
    title: 
    { type: String,
      required: true 
    },
    description: {
      type: String 
    },
    tag: {
     type: String 
    },
    color: {
     type: String 
    },
    repeatCycle: {
     type: String,
     default: "Weekly" 
    },
    day: {
     type: String
     },
    date: {
     type: Number 
    },
    completed: {
     type: Boolean,
     default: false 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
