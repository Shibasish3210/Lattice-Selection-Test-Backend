import validator from "validator";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import hospitalModel from '../schema/hospitalSchema.js'
import asyncHandler from "../utils/asyncHandler.js";
import { ObjectId } from "../config/db.js";
import doctorModel from "../schema/doctorSchema.js";
import patientModel from "../schema/patientSchema.js";

const handlePatientDetails = asyncHandler(async (req, res)=>{
    const response = await patientModel.find();

    const withOutPasswordData = response.map(patient=> ({_id: patient._id, Name: patient.Name, Email: patient.Email, PatientPhoto: patient.PatientPhoto, Address: patient.Address}));


    return res.status(200).send(new ApiResponse(200, 'Patient details retrived successfully', withOutPasswordData));
});


const handleDoctorDetails = asyncHandler(async (req, res)=>{
    const response = await doctorModel.find();


    return res.status(200).send(new ApiResponse(200, 'All Doctor details retrived successfully', response))
});


const handleAllHospitalDetails = asyncHandler(async (req, res)=>{
    const response = await hospitalModel.find();

    return res.status(200).send(new ApiResponse(200, 'All Hospital details retrived successfully', response));
});


const handleHospitalDetails = asyncHandler(async (req, res)=>{
    //getting hospital id from req query and validating it
    const { hospital_id } = req.query;
    if(!hospital_id) throw new ApiError(400, 'Hopitial Id is required');
    if(!validator.isMongoId(hospital_id)) throw new ApiError(400, 'Invalid hospital id');

    //
    const response = await hospitalModel.findOne({_id: hospital_id});
    if(!response) throw new ApiError(404, 'No hospital found with provided hospital id')

    const phscyDetails = await doctorModel.find({
        '_id': { $in: response.PsychiatristDetails}
    });
    response.PsychiatristDetails = phscyDetails.map(doctor=>({Id: doctor._id,Name: doctor.Name,PatientCount:doctor.PatientCount }));
    return res.status(200).send(new ApiResponse(200, 'Hospital details retrived successfully', response));
})

export { handlePatientDetails, handleDoctorDetails, handleHospitalDetails, handleAllHospitalDetails };