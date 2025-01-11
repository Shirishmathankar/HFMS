import { useState } from "react";

 const  PatientManagement=()=>{
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    diseases: "",
    allergies: "",
    roomNumber: "",
    bedNumber: "",
    floorNumber: "",
    age: "",
    gender: "",
    contactInfo: "",
    emergencyContact: "",
  });
  const [isSwitch,setisSwitch]=useState(false)
   const handleclick=async(e)=>{
    e.preventDefault();
    if(isSwitch){
     setisSwitch(false);
    }
    else{
        setisSwitch(true);
    }
     try {
        // Send a GET request to the server
        const response = await fetch("/api/v1/users/get-pateint"); 
         const data=await response.json();
          console.log(data)
          setPatients(data.data);

      } catch (error) {
        console.error("Error fetching patient data:", error);
        setPatients([]); // Clear the patients list in case of an error
      }
    
   }
  const handleInputChange =  (e) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });

  };

  const handleAddPatient = async (e) => {
    setPatients([...patients, { ...newPatient, id: patients.length + 1 }]);
    e.preventDefault(); // Prevent the default form submission behavior
  
    try {
      // Send a POST request to the server with the form data
      const res = await fetch('/api/v1/users/pateint',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatient), // Send formData as a JSON string
      });
  
      // Check if the response status is OK (e.g., 200 or 201)
      if (!res.ok) {
        // Parse the error message returned by the server
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to register');
      }
  
      const data = await res.json();
  
      
      
    } catch (error) {
      
      console.error('Registration error:', error);
      alert(error.message || 'An error occurred while registering. Please try again.');
    }
    setNewPatient({
      name: "",
      diseases: "",
      allergies: "",
      roomNumber: "",
      bedNumber: "",
      floorNumber: "",
      age: "",
      gender: "",
      contactInfo: "",
      emergencyContact: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Patient Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          placeholder="Name"
          name="name"
          value={newPatient.name}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          placeholder="Diseases"
          name="diseases"
          value={newPatient.diseases}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          placeholder="Allergies"
          name="allergies"
          value={newPatient.allergies}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          placeholder="Room Number"
          name="roomNumber"
          value={newPatient.roomNumber}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          placeholder="Bed Number"
          name="bedNumber"
          value={newPatient.bedNumber}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          placeholder="Floor Number"
          name="floorNumber"
          value={newPatient.floorNumber}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          placeholder="Age"
          name="age"
          type="number"
          value={newPatient.age}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          placeholder="Gender"
          name="gender"
          value={newPatient.gender}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          placeholder="Contact Information"
          name="contactInfo"
          value={newPatient.contactInfo}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          placeholder="Emergency Contact"
          name="emergencyContact"
          value={newPatient.emergencyContact}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        onClick={handleAddPatient}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Patient
      </button>
     
      {isSwitch&&(<div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Diseases
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Allergies
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Room
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Bed
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Floor
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Age
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Gender
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Contact
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Emergency Contact
              </th>
            </tr>
          </thead>
          <tbody>
          {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {patient.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {patient.diseases}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {patient.allergies}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {patient.roomNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {patient.bedNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {patient.floorNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {patient.age}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {patient.gender}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {patient.contactInfo}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {patient.emergencyContact}
                </td>
              </tr>
            ))}
            
          </tbody>
         
        </table>
      </div>)}
      <button onClick={handleclick}  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 mx-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{isSwitch?'close-list':'show-pateint'}</button>    
    </div>
     
  );
}
export default PatientManagement