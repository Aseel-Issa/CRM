USE CRM;

-- CREATE TABLE Employees(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(20)
-- );

-- DROP TABLE Clients;

-- CREATE TABLE Clients(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     long_id VARCHAR(24),
--     name VARCHAR(20),
--     email VARCHAR(50),
--     firstContact DATE,
--     emailType CHAR,
--     sold BOOLEAN,
--     owner INT,
--     country INT,

--     FOREIGN KEY(owner) REFERENCES Employees(id),
--     FOREIGN KEY(country) REFERENCES Country(id)

-- );

-- CREATE TABLE Country(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(20)
-- );