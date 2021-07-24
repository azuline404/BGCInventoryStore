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

    async getProductByID(product_id){
        return await queryDB(`SELECT * FROM products INNER JOIN product_details ON products.product_id = product_details.product_id WHERE products.product_id = ${product_id}`)
    },

    async getProductBySkuID(sku_id){
        return await queryDB(`SELECT * FROM products INNER JOIN product_details ON products.product_id = product_details.product_id WHERE product_details.sku_id = ${sku_id}`)
    },

    async addProductBySkuIDToCart(user_id, sku_id){
        
        await queryDB(`IF NOT EXISTS (
            SELECT * FROM users INNER JOIN orders ON users.user_id = orders.requester_id WHERE status='incomplete'
        ) INSERT INTO orders (requester_id, status, date_created) VALUES (${user_id}, 'incomplete', NOW())`)

        // return await queryDB(`
        //     INSERT INTO orders ()
        // `)
    },
    async insertProduct(name,description,value,category){
        return await queryDB(`INSERT INTO products (product_name, product_desc, value, category) VALUES ('${name}', '${description}', '${value}', '${category}') RETURNING product_id`)
    },
    async insertProductDetails(sku_id, product_id, size, gender, color, location, count, imgurl){
        return await queryDB(`INSERT INTO product_details (sku_id, product_id, size, gender, color, product_location, product_count, product_img) VALUES ('${sku_id}', '${product_id}', '${size}', '${gender}', '${color}', '${location}', '${count}', '${imgurl}')`)
    },
}

module.exports = productModelControls;

