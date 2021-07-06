const pool = require("../util/postgresql");
let pg = ('../util/postgresql');


async function getAllProducts()
{
    try {
        const res = await pg.query(`SELECT * FROM products`)
        return res.rows
    } catch (err) {
        return err.stack
    }
}

async function getProductsByCategory(productCategory)
{
    try {
        const res = await pg.query(`SELECT * FROM products WHERE category = ${productCategory}`);
        return res.rows
    } catch (err) {
        return err.stack
    }
}

async function getProductByID(productID)
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