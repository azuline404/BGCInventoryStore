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
        return await queryDB(`SELECT * FROM products`)
    },

    async getAllBottles() {
        return await queryDB(`SELECT * FROM bottles INNER JOIN products ON bottles.product_id = products.product_id`)
    },

    async getAllBackpacks() {
        return await queryDB(`SELECT * FROM backpacks INNER JOIN products ON backpacks.product_id = products.product_id`)
    },

    async getAllShirts() {
        return await queryDB(`SELECT * FROM shirts INNER JOIN products ON shirts.product_id = products.product_id`)
    },

    async getAllUsers() {
        return await queryDB(`SELECT * FROM users`)
    },
    async insertProduct(name,description,value,category){
        return await queryDB(`INSERT INTO products (product_name, product_desc, value, category) VALUES ('${name}', '${description}', '${value}', '${category}') RETURNING product_id`)
    },
    async insertProductDetails(sku_id, product_id, size, gender, color, location, count, imgurl){
        return await queryDB(`INSERT INTO product_details (sku_id, product_id, size, gender, color, product_location, product_count, product_img) VALUES ('${sku_id}', '${product_id}', '${size}', '${gender}', '${color}', '${location}', '${count}', '${imgurl}')`)
    },
}

module.exports = productModelControls;

/*
const productModelControls = {

    async getAllProducts()
    {
        try {
            const res = await pg.query(`SELECT * FROM products`)
            return res.rows
        } catch (err) {
            return err.stack
        }
    },
    
    async getProductsByCategory(productCategory)
    {
        try {
            const res = await pg.query(`SELECT * FROM products WHERE category = ${productCategory}`);
            return res.rows
        } catch (err) {
            return err.stack
        }
    },
    
    async getAllBottles()
    {
        try {
            const res = await pg.query(`SELECT * FROM bottles`);
            return res.rows;
        } catch (err) {
            return err.stack
        }
    },
    
    async getProductByID(productID)
    {
        try {
            const res = await pg.query(`SELECT * FROM products WHERE productID = ${productID}`)
            return res.rows
        } catch(err) {
            return err.stack
        }
    }
    
    // INVOCATION:
    // var allProducts = await getAllProducts()
    // var allProductsInCategory = await getProductsByCategory('bottles')
    // var specificProduct = await getProductByID()
}

module.exports = productModelControls;
*/