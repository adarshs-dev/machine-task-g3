import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  status: { type: String, enum: ['todo', 'in-progress', 'completed', 'overdue'], default: 'todo' },
  dueDate: { type: Date, required: true },
  attachment: { type: String },
}, { timestamps: true });
export default mongoose.model('Task', taskSchema);
