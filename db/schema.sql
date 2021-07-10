-- USERS
CREATE TABLE users (
    user_id serial NOT NULL,
    username varchar(40) NOT NULL,
    email varchar(320) NOT NULL,
    role varchar(40) NOT NULL,
    CONSTRAINT permissions CHECK (role IN ('staff', 'administrator')),
    PRIMARY KEY (user_id)
);

INSERT INTO users (username, email, role) VALUES ('abiel_kim', 'abielkim@hotmail.com', 'administrator');

-- PRODUCTS
CREATE TABLE products 
(
    product_id serial NOT NULL,
    product_name varchar(40) NOT NULL,
    product_desc varchar(40) NOT NULL, 
    category varchar(40) NOT NULL,
    PRIMARY KEY (product_id)
);

CREATE TABLE bottles
(
    product_id int NOT NULL,
    bottle_id serial NOT NULL,
    info_code varchar(40) NOT NULL,
    product_location varchar(40) NOT NULL,
    product_count int NOT NULL,
    product_img varchar(200) NOT NULL,
    PRIMARY KEY (bottle_id),
    CONSTRAINT bottles_stock_products_FK FOREIGN KEY (product_id) REFERENCES products (product_id)
);

INSERT INTO products (product_name, product_desc, category)
VALUES ('bottle_a', 'bottle good for a', 'bottle'), ('bottle_b', 'bottle good for b', 'bottle'), ('bottle_c', 'bottle good for c', 'bottle'), ('bottle_d', 'bottle good for d', 'bottle'),('bottle_e', 'bottle good for e', 'bottle');

INSERT INTO bottles (product_id, info_code, product_location, product_count, product_img)
VALUES (1, 'L', 'burnaby', 5, 'bottle.jpg'), (2, 'S', 'vancouver', 3, 'bottle.jpg'), (3, 'M', 'richmond', 2, 'bottle.jpg'), (4, 'M', 'metrotown', 2, 'bottle.jpg'),(5, 'L', 'burnaby', 4, 'bottle.jpg');
