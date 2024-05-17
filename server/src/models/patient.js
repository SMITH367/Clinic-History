const savePatient = "INSERT INTO patients SET ?";
const getPatients = "SELECT * FROM patients";
const getPatient = "SELECT * FROM patients WHERE identification = ?"
const searchPatient = "SELECT * from patients WHERE name LIKE ? OR identification LIKE ?"
const deletePatient = "DELETE FROM patients WHERE identification = ?";
const updatePatient = "UPDATE patients SET ? WHERE identification = ?"
module.exports = {
    savePatient,
    getPatients,
    getPatient,
    deletePatient,
    searchPatient,
    updatePatient

}