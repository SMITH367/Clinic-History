const saveClass = "INSERT INTO classes SET ?";
const getClasses = "SELECT * FROM classes";
const updateClass = "UPDATE classes SET ? WHERE class_id=?"

module.exports = {
    saveClass,
    getClasses,
    updateClass
}