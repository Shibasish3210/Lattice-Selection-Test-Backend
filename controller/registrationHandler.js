import { response } from "express";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import { createPatientRecord, findExistingDoctor, findExistingPatient } from "../model/patientModel.js";
import hospitalModel from "../schema/hospitalSchema.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validatePatientRegistration } from "../utils/validateRegistration.js";
import doctorModel from "../schema/doctorSchema.js";
import validator from "validator";

export const handlePatientRegistration = asyncHandler(async (req, res)=>{
    //destructuring fields from request body
    const { Name, Address, Email, PhoneNumber, Password, DoctorId } = req.body;
    
    //validation of the fields
    await validatePatientRegistration({ Name, Address, Email, PhoneNumber, Password, DoctorId });
    
    //getting the localpath from the request file(got from multer.single)
    const patientPhoto = req.file?.path;
    if(!patientPhoto) throw new ApiError(400, "PatientPhoto is required");
    
    //checking if patient exists with this email already
    await findExistingPatient(Email);
    await findExistingDoctor(DoctorId);
    
    //upload the patient photo in cloudinary
    const PatientPhoto =  await uploadOnCloudinary(patientPhoto);
    if(!PatientPhoto) throw new ApiError(500, "Something went wrong while uploading patient photo");


    //creating a patient object with all the details
    const patient = {
        Name,
        Address,
        Email,
        Password,
        PatientPhoto: PatientPhoto.url,
        DoctorId,
        PhoneNumber
    }

    //if there is no phone number deleting it and saving patient in db
    !PhoneNumber && delete patient.PhoneNumber;
    const createdPatient = await createPatientRecord(patient);
    if(!createdPatient) throw new ApiError('500', "Something went wrong while creating patient record");

    const updatedDoctor = await doctorModel.findOneAndUpdate(
        {_id: DoctorId},
        {
            $inc:{PatientCount: 1},
            $push:{Patients: createdPatient._id}
        })
    await hospitalModel.findOneAndUpdate(
        {_id:updatedDoctor.HospitalID},
        {
            $inc:{TotalPatientsCount:1}
        }
    )

    return res.status(201).send(new ApiResponse(201, 'Successfully registered the patient', createdPatient));
});


export const handleDoctorRegistration = asyncHandler(async(req, res)=>{
    const { doctor_name, hospital_id } = req.body;

    if(!doctor_name || !hospital_id ) throw new ApiError(400, 'Doctor name & Hospital Id both are required');
    if(!validator.isMongoId(hospital_id) ) throw new ApiError(400, 'Please provide a valid Hospital Id');

    const doctorExists = await doctorModel.findOne({Name: doctor_name, HospitalID: hospital_id});
    if(doctorExists) throw new ApiError(409,`Doctor already exists`);

    const doctorDbObj = new doctorModel({
        Name: doctor_name,
        HospitalID: hospital_id
    });
    const resp = await doctorDbObj.save();
    if(!resp) throw new ApiError(500, 'Something went wrong while creating the record for the doctor');

    const updatedHospital = await hospitalModel.findOneAndUpdate(
        {_id: hospital_id},
        { 
            $inc: {TotalPsychiatristCount : 1},
            $push: {PsychiatristDetails: resp._id}
        }
    );

    
    return res.status(201).send(new ApiResponse(201, 'Successfully registered the doctor', resp));
});


export const handleHospitalRegistration = asyncHandler(async(req, res)=>{
    const { hospital_name } = req.body;
    if(!hospital_name) throw new ApiError(400, 'Hospital name is required');
    const hospitalExists = await hospitalModel.findOne({HospitalName: hospital_name});
    if(hospitalExists) throw new ApiError(409, 'Hospital already exists');

    const hospitalDbObj = new hospitalModel({
        HospitalName: hospital_name.trim(),
    });

    const resp = await hospitalDbObj.save();

    if(!resp) throw new ApiError(500, 'Something went wrong while creating record for the hospital');

    return res.status(201).send(new ApiResponse(201, 'Successfully registered the hospital', resp));
});