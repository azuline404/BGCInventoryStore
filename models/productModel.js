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

    async getAllBottles() {
        return await queryDB(`SELECT * FROM bottles`)
    },

    async getAllJackets() {
        return await queryDB(`SELECT * FROM jackets`)
    }
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