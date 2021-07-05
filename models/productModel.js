let pg = ('../util/postgresql');



const getAll = () => {
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * from products`)
            .then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        });
    });
};

const getProduct = (productID) => {
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * from products products.id = ` + id)
            .then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        });
    });
};

const getCategory = (category) => {
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * from products where category =  ` + category)
            .then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        });
    });
};

const getSpecificProduct = (productID, productDescriptionID) => {
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * from products INNER JOIN where products.id = ` + id + `AND productDescriptionID =` + productDescriptionID)
            .then((res, err) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        });
    });
};
