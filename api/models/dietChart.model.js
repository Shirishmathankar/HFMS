import mongoose from "mongoose"

const dietChartSchema = new mongoose.Schema({
  patientId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Patient', 
     required: true 
   },
  meals: [
    {
      type: {
         type: String, 
         enum: ['Morning', 'Evening', 'Night'],
          required: true
         },
      ingredients: { 
        type: [String],
        required: true
       },
      instructions: {
         type: String,
          default: '' 
        }, // E.g., "No salt", "Low sugar"
    },
  ],
  
},{
    timestamps:true,
});

const DietChart = mongoose.model('DietChart', dietChartSchema);

module.exports = DietChart;
