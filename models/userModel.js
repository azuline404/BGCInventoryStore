const { query } = require('express');
const pg = require('../db/postgresql');

const userModelControls = {
    getUserRole : (email) => {
    console.log(email);
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * from users WHERE email = '${email}'`)
            .then((res, err) => {
            if (err) {
                reject(err);
            }
            console.log(res.rows);
            resolve(res.rows);
        });
    });
    },

    async getAlluser(){
        return await pg.query(`SELECT * FROM users`)
    }
}
module.exports = userModelControls;