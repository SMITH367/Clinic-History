const saveClass = "INSERT INTO classes SET ?";
const getClasses = "SELECT * FROM classes";
const deleteClass = "DELETE FROM classes WHERE name = ?"

module.exports = {
    saveClass,
    deleteClass,
    getClasses
}