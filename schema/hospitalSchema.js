import { Schema,model } from "../config/db.js";

const hospitalSchema = new Schema({
    HospitalName: {
        type: "string",
        unique: true,
        required: true,
    },
    TotalPsychiatristCount: {
        type: "number",
        default: 0,
    },
    TotalPatientsCount: {
        type: "number",
        default: 0,
    },
    PsychiatristDetails: {
        type: 'array',
        default: [],
    } 
});

const hospitalModel = model( 'hospital', hospitalSchema );

export default hospitalModel;