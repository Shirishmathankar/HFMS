import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: 
  { type: String, 
    required: true 
  },
  age: 
  { type: Number,
    required: true 
  },
  gender: { 
    type: String,
     required: true },
  diseases: { 
    type: [String],
     default: [] 
    },
  allergies: { 
    type: [String],
     default: [] 
    },
  roomNumber: { 
    type: Number,
     required: true 
    },
  bedNumber: {
     type: Number,
     required: true
     },
  floorNumber: {
     type: Number,
      required: true
     },
  contactInfo: { 
    type: Number,
     required: true
     },
  emergencyContact: { 
    type: Number, 
    required: true },
  
},
{
    timestamps:true
});

export const Patient = mongoose.model('Patient', patientSchema);

