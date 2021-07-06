-- USERS
CREATE TABLE `users`
(
    `user_id` serial NOT NULL,
    `username` varchar(20) NOT NULL,
    `email` varchar(320) NOT NULL,
    `role` varchar(20) NOT NULL,
    CONSTRAINT `permissions` CHECK (`role` IN ('staff', 'admin')),
    PRIMARY KEY (`user_id`)
)

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (0, `eldon_wong`, `EWong@bgcengineering.ca`, `admin`);
UNLOCK TABLES;


-- PRODUCTS
CREATE TABLE `products` 
(
    `product_id` serial NOT NULL,
    `product_name` varchar(20) NOT NULL,
    `product_desc` varchar(250) NOT NULL, 
    `category` varchar(20) NOT NULL,
    PRIMARY KEY (`product_id`)
)

-- test product table
CREATE TABLE `bottles` 
(
    `product_id` serial NOT NULL,
    PRIMARY KEY (`product_id`)
    CONSTRAINT `bottles_products_FK` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
)

CREATE TABLE `bottles_stock`
(
    `product_id` serial NOT NULL,
    `info_code` varchar(65535) NOT NULL,
    `location` varchar(250) NOT NULL,
    `count` int NOT NULL,
    PRIMARY KEY (`product_id`),
    CONSTRAINT `bottles_stock_products_FK` FOREIGN KEY (`product_id`) REFERENCES `bottles` (`product_id`)
)