import { useState } from "react";

const initialPantryStaff = [
  {
    id: 1,
    name: "Alice Johnson",
    contactInfo: "123-456-7890",
    location: "Main Kitchen",
  },
];

export default function PantryManagement() {
  const [pantryStaff, setPantryStaff] = useState(initialPantryStaff);
  const [newStaff, setNewStaff] = useState({
    name: "",
    contactInfo: "",
    location: "",
  });

  const handleInputChange = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  const handleAddStaff = () => {
    setPantryStaff([
      ...pantryStaff,
      { ...newStaff, id: pantryStaff.length + 1 },
    ]);
    setNewStaff({ name: "", contactInfo: "", location: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Pantry Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="name"
          value={newStaff.name}
          onChange={handleInputChange}
          placeholder="Staff Name"
          className="block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="text"
          name="contactInfo"
          value={newStaff.contactInfo}
          onChange={handleInputChange}
          placeholder="Contact Info"
          className="block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="text"
          name="location"
          value={newStaff.location}
          onChange={handleInputChange}
          placeholder="Location"
          className="block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        onClick={handleAddStaff}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Staff
      </button>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Contact Info
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {pantryStaff.map((staff) => (
              <tr key={staff.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {staff.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {staff.contactInfo}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {staff.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
