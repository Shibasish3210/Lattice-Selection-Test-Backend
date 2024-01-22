import { Route } from "../config/app.js";
import { handleAllHospitalDetails, handleDoctorDetails, handleHospitalDetails, handlePatientDetails } from "../controller/readDetailsHandler.js";


const readDetailsRoute = Route();

readDetailsRoute.get('/patients', handlePatientDetails);
readDetailsRoute.get('/doctors', handleDoctorDetails);
readDetailsRoute.get('/hospitals', handleAllHospitalDetails);
readDetailsRoute.get('/hospital', handleHospitalDetails);

export default readDetailsRoute;