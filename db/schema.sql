-- USERS
CREATE TABLE users (
    user_id serial NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    role text NOT NULL,
    CHECK (role in ('staff', 'admin')),
    PRIMARY KEY (user_id)
);

INSERT INTO users (username, email, role)
	VALUES ('eldon_wong', 'EWong@bgcengineering.ca', 'admin'), ('abiel_kim', 'abielk@sfu.ca', 'admin');

-- PRODUCTS
CREATE TABLE products 
(
    product_id serial NOT NULL,
    product_name text NOT NULL,
    product_desc text NOT NULL, 
    category text NOT NULL,
    PRIMARY KEY (product_id)
);

-- test product table
CREATE TABLE bottles
(
    product_id serial NOT NULL,
    PRIMARY KEY (product_id),
    CONSTRAINT bottles_products_FK FOREIGN KEY (product_id) REFERENCES products (product_id)
);

CREATE TABLE bottles_stock
(
    product_id serial NOT NULL,
    info_code text NOT NULL,
    product_location text NOT NULL,
    product_count int NOT NULL,
    PRIMARY KEY (product_id),
    CONSTRAINT bottles_stock_products_FK FOREIGN KEY (product_id) REFERENCES bottles (product_id)
);