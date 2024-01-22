import { ID, Schema,model } from "../config/db.js";

const patientSchema = new Schema({
    Name: {
        type: "string",
        required: true,
    },
    Address: {
        type: "string",
        required: true,
    },
    Email: {
        type: "string",
        unique: true,
        required: true,
    },
    PhoneNumber: {
        type: "string",
    },
    Password: {
        type: "string",
        required: true,
    },
    PatientPhoto: {
        type: "string",
        required: true,
    },
    DoctorId:{
        type: ID,
        required: true,
    }
});

const patientModel = model( 'patient', patientSchema );

export default patientModel;