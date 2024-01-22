import { ID, Schema,model } from "../config/db.js";

const doctorSchema = new Schema({
    Name: {
        type: "string",
        required: true,
    },
    PatientCount: {
        type: 'number',
        default:0,
    },
    Patients:{
        type: "array",
        default: []
    },
    HospitalID:{
        type: ID,
        required: true,
    }
});

const doctorModel = model( 'doctor', doctorSchema );

export default doctorModel;