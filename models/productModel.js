const pool = require("../db/postgresql");
let pg = ('../db/postgresql');

// FUNCTIONS
// =========
async function queryDB(q) {
    const client = await pool.connect()
    let res
    try {
        await client.query('BEGIN')
        try {
            res = await client.query(q)
            await client.query('COMMIT')
        } catch (err) {
            await client.query('ROLLBACK')
            throw err
        }
    } finally {
        client.release()
    }
    return res
}

// EXPORT SPECIALIZED QUERIES
// ==========================
const productModelControls = {

    async getAllProducts() {
        return await queryDB(`SELECT * FROM products INNER JOIN product_details ON products.product_id = product_details.product_id`)
    },

    async getAllBottles() {
        return await queryDB(`SELECT * FROM products INNER JOIN product_details ON products.product_id = product_details.product_id WHERE products.category = 'bottle'`)
    },

    async getAllBackpacks() {
        return await queryDB(`SELECT * FROM products INNER JOIN product_details ON products.product_id = product_details.product_id WHERE products.category = 'backpack'`)
    },

    async getAllShirts() {
        return await queryDB(`SELECT * FROM products INNER JOIN product_details ON products.product_id = product_details.product_id WHERE products.category = 'shirt'`)
    },

    async getAllUsers() {
        return await queryDB(`SELECT * FROM users`)
    },
    
    async getOneProduct(n) {
        return await queryDB(`SELECT * FROM products INNER JOIN product_details ON products.product_id = product_details.product_id WHERE products.product_id =` + n)
    },
}

module.exports = productModelControls;
