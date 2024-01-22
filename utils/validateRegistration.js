import validator from "validator";
import ApiError from "./ApiError.js"

const passwordRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?!.*\s).{8,15}$/;

const validatePatientRegistration = ({ Name, Address, Email, PhoneNumber, Password, DoctorId })=>{
    return new Promise((resolve, reject)=>{
        //checking presence of the required fields
        if(!Name ) reject(new ApiError(400, "Patient Name is required"));
        if(!Address) reject(new ApiError(400, "Patient Address is required"));
        if(!Password) reject(new ApiError(400, "Password is required"));
        if(!Email) reject(new ApiError(400, "Email Adress is required"));
        if(!DoctorId) reject(new ApiError(400, "Doctor Id is required to register a patient"));

        //checking datatype of the fields
        if(typeof Name !== 'string') reject(new ApiError(400, "Invalid datatype for name"));
        if(typeof Address !== 'string') reject(new ApiError(400, "Invalid datatype for address"));
        if(typeof Email !== 'string') reject(new ApiError(400, "Invalid datatype for email"));
        if(typeof Password !== 'string') reject(new ApiError(400, "Invalid datatype for password"));
        if(typeof DoctorId !== 'string') reject(new ApiError(400, "Invalid datatype for doctor id"));
        if(PhoneNumber && typeof PhoneNumber !== 'string') reject(new ApiError(400, "Invalid datatype for phone number"));

        //validating if actual data is valid
        if(Address.length < 10) reject(new ApiError(400, "Address should be at least 10 characters"));
        if(!validator.isMongoId(DoctorId)) reject(new ApiError(400, "Invalid doctor id"));
        if(!validator.isEmail(Email)) reject(new ApiError(400, "Invalid email address"));
        if(!passwordRegex.test(Password)) reject(new ApiError(400, "Invalid password. Must contain one uppercase, lowercase and digit and length should be 8-15 characters"));
        if(PhoneNumber && !validator.isMobilePhone(PhoneNumber)) reject(new ApiError(400, "Not a valid phone number, it should be country code and 10 digits"));

        //if promise not rejected earlier then resolve promise
        resolve();
    })
}

export {validatePatientRegistration};