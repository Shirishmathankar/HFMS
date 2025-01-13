import asynchandler from "../utils/asynchandler.js";
import errorhandler from "../utils/APIerror.js";
import { Patient } from "../models/pateint.model.js";
import Apiresposnse from "../utils/Apiresponse.js";

const pateintHandler = asynchandler(async (req, res, next) => {
  const {
    name,
    age,
    gender,
    diseases,
    allergies,
    roomNumber,
    bedNumber,
    floorNumber,
    contactInfo,
    emergencyContact,
  } = req.body;

  // Validate input fields
  if (
    !name ||
    !age ||
    !gender ||
    !diseases ||
    !allergies ||
    !roomNumber ||
    !bedNumber ||
    !floorNumber ||
    !contactInfo ||
    !emergencyContact
  ) {
    return next(errorhandler(400, "All fields are required"));
  }

  // Parse numeric fields
  const parsedAge = parseInt(age, 10);
  const parsedRoomNumber = parseInt(roomNumber, 10);
  const parsedBedNumber = parseInt(bedNumber, 10);
  const parsedFloorNumber = parseInt(floorNumber, 10);
  const parsedContactInfo = parseInt(contactInfo, 10);
  const parsedEmergencyContact = parseInt(emergencyContact, 10);

  // Create patient
  let createdPatient;
  try {
    createdPatient = await Patient.create({
      name,
      age: parsedAge,
      gender,
      diseases,
      allergies,
      roomNumber: parsedRoomNumber,
      bedNumber: parsedBedNumber,
      floorNumber: parsedFloorNumber,
      contactInfo: parsedContactInfo,
      emergencyContact: parsedEmergencyContact,
    });
  } catch (error) {
    return next(errorhandler(500, "Error creating patient: " + error.message));
  }

  // Respond with success message
  return res
    .status(201)
    .json(
      new Apiresposnse(201, createdPatient, "Patient registered successfully")
    );
});

const getPatientsHandler = asynchandler(async (req, res, next) => {
  try {
    // Fetch all patients from the database
    const patients = await Patient.find();

    // Check if patients exist
    if (!patients || patients.length === 0) {
      return next(errorhandler(404, "No patients found"));
    }

    return res
      .status(200)
      .json(new Apiresposnse(200, patients, "Patients fetched successfully"));
  } catch (error) {
    return next(errorhandler(500, "Internal server error: " + error.message));
  }
});

export { pateintHandler, getPatientsHandler };
