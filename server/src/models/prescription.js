const savePrescription = "INSERT INTO prescriptions SET ?";
const getPrescriptions = "SELECT patients.name, patients.identification, id_prescription, prescription, date_prescription FROM prescriptions, patients WHERE prescriptions.patient = patients.identification"
const getPrescriptionByID = "SELECT id_prescription FROM prescriptions WHERE id_prescription = ?"
const deletePrescription = "DELETE FROM prescriptions WHERE id_prescription = ?"
module.exports = {
    savePrescription,
    getPrescriptions,
    getPrescriptionByID,
    deletePrescription
}