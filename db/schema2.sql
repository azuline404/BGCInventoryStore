--USERS
-------
CREATE TABLE users (
    user_id serial NOT NULL,
    username varchar(50) NOT NULL,
    email varchar(320) NOT NULL,
    role varchar(50) NOT NULL,
    CONSTRAINT permissions CHECK (role IN ('staff', 'administrator')),
    PRIMARY KEY (user_id)
);

INSERT INTO users (username, email, role) VALUES ('abiel_kim', 'abielkim@hotmail.com', 'administrator');
INSERT INTO users (username, email, role) VALUES ('tazjmal', 'tazjmal633@gmail.com', 'administrator');
INSERT INTO users (username, email, role) VALUES ('tommychang', 'tommychang97@gmail.com', 'administrator');
INSERT INTO users (username, email, role) VALUES ('wenqing', 'wenqingl@sfu.ca', 'administrator');
INSERT INTO users (username, email, role) VALUES ('junchenl', '2664454673@qq.com', 'administrator');



--LOCATIONS
-----------
CREATE TABLE locations 
(
    location_name varchar(50) NOT NULL,
    PRIMARY KEY (location_name)
);


--PRODUCTS
----------
CREATE TABLE products 
(
    product_id serial NOT NULL,
    product_name varchar(50) NOT NULL,
    product_desc varchar(300) NOT NULL, 
    category varchar(50) NOT NULL,
    value int NOT NULL,
    PRIMARY KEY (product_id)
);

CREATE TABLE product_details
(
    product_id int NOT NULL,
    sku_id int NOT NULL,
    size varchar(50),
    gender varchar(50),
    color varchar(50),
    product_img varchar(200) NOT NULL,
    PRIMARY KEY (sku_id),
    CONSTRAINT product_id_FK FOREIGN KEY (product_id) REFERENCES products (product_id)
);


--ORDERS
--------
CREATE TABLE orders
(
    order_id serial NOT NULL,
    requester_id int NOT NULL,
    fulfiller_id int,
    status varchar(50) NOT NULL,
    request_type varchar(50),
    date_created date NOT NULL,
    date_completed date,
    PRIMARY KEY (order_id),
    CONSTRAINT requester_id_FK FOREIGN KEY (requester_id) REFERENCES users (user_id),
    CONSTRAINT fulfiller_id_FK FOREIGN KEY (fulfiller_id) REFERENCES users (user_id)
);

CREATE TABLE order_lines
(
    order_id int NOT NULL,
    sku_id int NOT NULL,
    order_count int NOT NULL,
    PRIMARY KEY (order_id, sku_id),
    CONSTRAINT order_id_FK FOREIGN KEY (order_id) REFERENCES orders (order_id),
    CONSTRAINT sku_id_FK FOREIGN KEY (sku_id) REFERENCES product_details (sku_id)
);

CREATE TABLE product_details_offices
(
    sku_id int NOT NULL,
    location varchar(50) NOT NULL,
    quantity int NOT NULL,
    CONSTRAINT sku_id_fk FOREIGN KEY (sku_id) REFERENCES product_details (sku_id),
    CONSTRAINT office_fk FOREIGN KEY (location) REFERENCES locations (location_name),
    PRIMARY KEY (sku_id, location)

);












