import { Route } from "../config/app.js";
import { handlePatientRegistration, handleDoctorRegistration, handleHospitalRegistration } from "../controller/registrationHandler.js";
import upload from "../middleware/fileHandler.js";
import asyncHandler from "../utils/asyncHandler.js";

const registrationRoute = Route();

registrationRoute.post('/register-patient', upload.single('PatientPhoto'), handlePatientRegistration);
registrationRoute.post('/register-doctor', handleDoctorRegistration);
registrationRoute.post('/register-hospital', handleHospitalRegistration);

export default registrationRoute;