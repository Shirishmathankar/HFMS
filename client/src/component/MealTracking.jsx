import { useState } from "react";

const initialMeals = [
  {
    id: 1,
    patientName: "John Doe",
    mealTime: "Morning",
    status: "Preparing",
    assignedTo: "Alice Johnson",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    mealTime: "Evening",
    status: "Ready",
    assignedTo: "Bob Carter",
  },
];

export default function MealTracking() {
  const [meals, setMeals] = useState(initialMeals);

  const updateMealStatus = (id, newStatus) => {
    setMeals(
      meals.map((meal) =>
        meal.id === id ? { ...meal, status: newStatus } : meal
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Meal Tracking</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Patient
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Meal Time
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Assigned To
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {meal.patientName}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {meal.mealTime}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {meal.status}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {meal.assignedTo}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  <select
                    className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={meal.status}
                    onChange={(e) => updateMealStatus(meal.id, e.target.value)}
                  >
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
