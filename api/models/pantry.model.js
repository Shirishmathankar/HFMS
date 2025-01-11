const mongoose = require('mongoose');

const pantrySchema = new mongoose.Schema({
  staffName: 
  { type: String,
    required: true 
  },
  contactInfo: {
     type: String, 
     required: true
     },
  location: { 
    type: String,
     required: true 
    },
  tasks: [
    {
      mealId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'DietChart' 
        },
      patientId: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'Patient'
         },
      status: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Completed'],
         default: 'Pending' 
        },
    },
  ],

},{
    timestamps:true,
});

const Pantry = mongoose.model('Pantry', pantrySchema);

module.exports = Pantry;
