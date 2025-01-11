import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  type: { 
    type: String,
    enum: ['Preparation', 'Delivery'],
    required: true
   },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  status: { 
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending' 
   },
  mealId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'DietChart', 
     required: true 
    },
  patientId: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient', 
      required: true },
 
},{timestamps:true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
