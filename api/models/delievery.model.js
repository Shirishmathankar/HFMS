import mongoose from "mongoose"

const deliverySchema = new mongoose.Schema({
  mealId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DietChart',
    required: true 
},
  patientId: {
   type: mongoose.Schema.Types.ObjectId, 
   ref: 'Patient',
   required: true },

  deliveryPersonnelId: {
   type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true },

  deliveryStatus: { 
    type: String, 
    enum: ['Pending', 'Delivered'],
    default: 'Pending' },
  deliveryTime: { type: Date },

  notes: { type: String,
     default: '' },
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
