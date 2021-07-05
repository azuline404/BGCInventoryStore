CREATE TABLE users
(
   userid serial,
   email varchar(40) NOT NULL,
   accountType varchar(20) NOT NULL,
   CONSTRAINT permissions CHECK (accountType IN ('staff', 'administrator')),
   PRIMARY KEY (id);
)

CREATE TABLE Products
(
    id serial,
    category varchar(30) NOT NULL,
    productid numeric(10,0),
    name varchar(50) NOT NULL,
    gender varchar(50) NOT NULL,
    description varchar (100),
    count numeric(10,0),
    PRIMARY KEY(productID)
)