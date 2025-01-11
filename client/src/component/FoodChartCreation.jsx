import { useState } from "react";

export default function FoodChartCreation() {
  const [foodChart, setFoodChart] = useState({
    patientId: "",
    morning: { meal: "", ingredients: "", instructions: "" },
    evening: { meal: "", ingredients: "", instructions: "" },
    night: { meal: "", ingredients: "", instructions: "" },
  });

  const handleInputChange = (meal, field, value) => {
    setFoodChart({
      ...foodChart,
      [meal]: { ...foodChart[meal], [field]: value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Food chart submitted:", foodChart);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Food Chart</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Select Patient */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Patient
          </label>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setFoodChart({ ...foodChart, patientId: e.target.value })}
          >
            <option value="" disabled selected>
              Select Patient
            </option>
            <option value="1">John Doe</option>
            <option value="2">Jane Smith</option>
          </select>
        </div>

        {/* Meal Inputs */}
        {["morning", "evening", "night"].map((mealTime) => (
          <div key={mealTime} className="space-y-4">
            <h3 className="text-lg font-semibold capitalize text-gray-800">
              {mealTime} Meal
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meal
              </label>
              <input
                type="text"
                placeholder="Meal"
                value={foodChart[mealTime].meal}
                onChange={(e) =>
                  handleInputChange(mealTime, "meal", e.target.value)
                }
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ingredients
              </label>
              <textarea
                placeholder="Ingredients"
                value={foodChart[mealTime].ingredients}
                onChange={(e) =>
                  handleInputChange(mealTime, "ingredients", e.target.value)
                }
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions
              </label>
              <textarea
                placeholder="Special Instructions"
                value={foodChart[mealTime].instructions}
                onChange={(e) =>
                  handleInputChange(mealTime, "instructions", e.target.value)
                }
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Food Chart
        </button>
      </form>
    </div>
  );
}
