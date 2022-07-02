const pool = require("./connection")

module.exports = {
    getUsersByID: async ( id ) => {
        return await pool.query('SELECT * FROM users WHERE id = ?', [id])
    },
    getUsersByFirstName: async ( firstName ) => {
        return await pool.query('SELECT * FROM users WHERE firstName = ?', [firstName])
    },
    insertingIntoUsers: async (body, date) => {
        var sql = `INSERT INTO users(firstName, email, password, date_of_registration) 
                        VALUES(?,?,?,?)`;
        await pool.query(sql, [body.firstName, body.email, body.password, date])
        return 'User registered'
    },
    updateUserProfile: async (body, id) => {
        var updateProfile = `UPDATE users SET firstName = ?, lastName = ?, email = ?, sex = ?, photo = ? WHERE id = ?`
        await pool.query(updateProfile, [body.firstName, body.lastName, body.email, body.sex, body.photo, id])
        return 'Profile is updated'
    }
}