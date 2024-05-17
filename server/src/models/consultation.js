const getConsultationsByPatient = "SELECT * FROM consultations WHERE patient = ?";
const getConsultationByPatient = "SELECT * FROM consultations WHERE id_consultation = ? LIMIT 1"
const updateConsultation = "UPDATE consultations SET description = ? WHERE id_consultation = ?"
const saveConsultation = "INSERT INTO consultations SET ?";

module.exports = {
    saveConsultation,
    getConsultationsByPatient,
    getConsultationByPatient,
    updateConsultation
}