## TrackingChain Project

TrackingChain is a comprehensive supply chain management system that tracks products from producers to retailers, ensuring transparency and efficiency throughout the process.

## Features

- User Management: Admins, Producers, Warehouses, Distributors, and Retailers
- Product Tracking: From creation to final sale
- Blockchain Integration: Wallet addresses for secure transactions
- Timestamp Tracking: Monitor product movement through the supply chain

## Technologies Used

- Database: MySQL 8.0
- Containerization: Docker
- Backend: [Your backend technology, e.g., Node.js, Python, etc.]
- Frontend: [Your frontend technology, e.g., React, Vue.js, etc.]
- Blockchain: [Your blockchain technology, e.g., Ethereum, Hyperledger, etc.]

## Setup

### Docker and Database

1. Pull the MySQL Docker image:
   
   
   docker pull mysql:latest
   

2. Run the MySQL container:
   
   
   docker run --name trackingchain -e MYSQL_ROOT_PASSWORD=test -p 3306:3306 -d mysql:8.0
   

### Database Setup

Use a database management tool like DBeaver to set up the database and tables:

1. Create the database:


CREATE DATABASE trackingchain;

USE trackingchain;

CREATE TABLE Admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,  -- Ensure proper encryption in the backend
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Productores (
    productor_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    ubicación VARCHAR(255),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Almacenes (
    almacen_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    ubicación VARCHAR(255),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Distribuidores (
    distribuidor_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    ubicación VARCHAR(255),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Minoristas (
    minorista_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    ubicación VARCHAR(255),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Productos (
    producto_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripción TEXT,
    productor_id INT,
    distribuidor_id INT,
    almacen_id INT,
    minorista_id INT,
    fecha_creación TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_distribución TIMESTAMP,
    fecha_almacen TIMESTAMP,
    fecha_recepción TIMESTAMP,
    FOREIGN KEY (productor_id) REFERENCES Productores(productor_id),
    FOREIGN KEY (distribuidor_id) REFERENCES Distribuidores(distribuidor_id),
    FOREIGN KEY (almacen_id) REFERENCES Almacenes(almacen_id),
    FOREIGN KEY (minorista_id) REFERENCES Minoristas(minorista_id)
);

ALTER TABLE Almacenes ADD COLUMN wallet_address VARCHAR(255);
ALTER TABLE Distribuidores ADD COLUMN wallet_address VARCHAR(255);
ALTER TABLE Minoristas ADD COLUMN wallet_address VARCHAR(255);
ALTER TABLE Productores ADD COLUMN wallet_address VARCHAR(255);

-- Add an admin
INSERT INTO Admins (nombre, email, contraseña) VALUES ('sergi', 'sergimima@gmail.com', 'test');


## Running the Application

[Provide instructions on how to run your backend and frontend applications]

## Contributing

[Provide guidelines for contributing to the project]

## License

[Specify the license under which your project is released]