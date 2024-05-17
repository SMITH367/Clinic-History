
const saveUser = "INSERT INTO users SET ?";
const selectUserByid = "SELECT * FROM users WHERE email = ?";

module.exports = {
    saveUser,
    selectUserByid

}