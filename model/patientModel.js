import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import patientModel from "../schema/patientSchema.js";
import ApiError from "../utils/ApiError.js";
import doctorModel from '../schema/doctorSchema.js';

dotenv.config();

const findExistingPatient = async(Email)=>{
    const existingPatient = await patientModel.findOne( {Email} );
    if(existingPatient) throw new ApiError(409,'Patient with this email already exists');
};
const findExistingDoctor = async(DoctorId)=>{
    const existingDoctor = await doctorModel.findOne( {_id:DoctorId} );
    if(!existingDoctor) throw new ApiError(404,'Doctor not found with provided doctor id');
};

const createPatientRecord = async (patient)=>{
    const Password = patient.Password;

    const hashedPassword = await bcrypt.hash(Password, +process.env.SALT);
    patient.Password = hashedPassword;
    
    const patientDbObj = new patientModel(patient);

    const createdPatient = await patientDbObj.save();

    return createdPatient;
};
export { findExistingPatient, findExistingDoctor, createPatientRecord };