const savePrescription = "INSERT INTO prescriptions SET ?";
const getPrescriptions = "SELECT * FROM prescriptions JOIN patients ON prescriptions.patient = patients.identification"
const getPrescriptionByID = "SELECT id_prescription FROM prescriptions WHERE id_prescription = ?"
const deletePrescription = "DELETE FROM prescriptions WHERE id_prescription = ?"
module.exports = {
    savePrescription,
    getPrescriptions,
    getPrescriptionByID,
    deletePrescription
}