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

    async createCartForRequesterID(requester_id){
        // if cart doesn't exist, create one
        var order_id = await queryDB(`INSERT INTO orders (requester_id, status, date_created) SELECT '${requester_id}', 'incomplete', NOW() WHERE NOT EXISTS (SELECT * FROM users INNER JOIN orders ON users.user_id = orders.requester_id WHERE status='incomplete') RETURNING order_id`)
        if (!order_id.rows.length){
            order_id = await queryDB(`SELECT order_id FROM orders WHERE requester_id='${requester_id}' AND status='incomplete'`)
        }
        order_id = order_id.rows[0].order_id;
        return order_id;
    },

    async addProductToCart(order_id, sku_id){
        // insert product into cart, if already exists increment count
        await queryDB(`UPDATE order_lines SET order_count=order_count+1 WHERE sku_id='${sku_id}';`)
        await queryDB(`
            INSERT INTO order_lines (order_id, sku_id, order_count)
            SELECT '${order_id}', '${sku_id}', '1'
            WHERE NOT EXISTS (SELECT * FROM order_lines WHERE sku_id='${sku_id}');
        `)
    },
    
    /*async getOneProduct(n) {
        return await queryDB(`SELECT * FROM products INNER JOIN product_details ON products.product_id = product_details.product_id WHERE products.product_id =` + n)
    },*/

    async insertProduct(name,description,value,category){
        return await queryDB(`INSERT INTO products (product_name, product_desc, value, category) VALUES ('${name}', '${description}', '${value}', '${category}') RETURNING product_id`)
    },

    async insertProductDetails(sku_id, product_id, size, gender, color, imgurl){
        return await queryDB(`INSERT INTO product_details (sku_id, product_id, size, gender, color, product_img) VALUES ('${sku_id}', '${product_id}', '${size}', '${gender}', '${color}', '${imgurl}')`)
    },
    async insertEmptyProductCount(sku_id){
        await queryDB(`INSERT INTO product_details_offices (sku_id, location, quantity) VALUES ('${sku_id}', 'Burnaby', '0')`)
        await queryDB(`INSERT INTO product_details_offices (sku_id, location, quantity) VALUES ('${sku_id}', 'Metrotown', '0')`)
        await queryDB(`INSERT INTO product_details_offices (sku_id, location, quantity) VALUES ('${sku_id}', 'New Westminster', '0')`)
        await queryDB(`INSERT INTO product_details_offices (sku_id, location, quantity) VALUES ('${sku_id}', 'Richmond', '0')`)
        await queryDB(`INSERT INTO product_details_offices (sku_id, location, quantity) VALUES ('${sku_id}', 'Surrey', '0')`)
        await queryDB(`INSERT INTO product_details_offices (sku_id, location, quantity) VALUES ('${sku_id}', 'Vancouver', '0')`)
    },  
    async getAllProducts(){
        return await queryDB(`SELECT * FROM product_details INNER JOIN products ON product_details.product_id = products.product_id`)
    },
    async getAllProductCounts(){
        return await queryDB(`SELECT * FROM product_details_offices`)
    },
    async getOneProduct(m){
        return await queryDB(`SELECT * FROM products WHERE product_id = ` + m)
    },

    async getAllSizes(m){
        return await queryDB(`SELECT DISTINCT size FROM product_details WHERE product_id = ` + m)
    },

    async getAllColors(m){
        return await queryDB(`SELECT DISTINCT color FROM product_details WHERE product_id = ` + m)
    },

    async getAllGenders(m){
        return await queryDB(`SELECT DISTINCT gender FROM product_details WHERE product_id = ` + m)
    },

    async getAllImage(m){
        return await queryDB(`SELECT DISTINCT product_img FROM product_details WHERE product_id = ` + m)
    }
}

module.exports = productModelControls;

