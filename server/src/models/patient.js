const savePatient = "INSERT INTO patients SET ?";
const getPatients = "SELECT patients.identification, patients.name, patients.last_name, patients.identificationType, classes.name as type FROM patients, classes WHERE patients.class_patient = classes.class_id";
const getPatient = "SELECT patients.identification, patients.name, patients.last_name, patients.identificationType, patients.birthday, patients.phone_number, classes.name as type FROM patients, classes WHERE patients.class_patient = classes.class_id and identification = ?"
const searchPatient = "SELECT patients.identification, patients.name, patients.last_name, patients.identificationType, classes.name as type FROM patients, classes WHERE patients.class_patient = classes.class_id AND (patients.name LIKE ? OR patients.identification LIKE ?)"
const updatePatient = "UPDATE patients SET ? WHERE identification = ?"
module.exports = {
    savePatient,
    getPatients,
    getPatient,
    searchPatient,
    updatePatient

}