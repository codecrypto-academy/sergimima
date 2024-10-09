## TRACKING CHAIN PROJECT

# Setu up docker and database

docker pull mysql:latest
docker run --name trackingchain -e MYSQL_ROOT_PASSWORD=test -p 3306:3306 -d mysql:8.0


# Set up the database and tables with Dbeaver
CREATE DATABASE trackingchain;

USE trackingchain;

CREATE TABLE Admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,  -- Asegúrate de que se cifre adecuadamente en el backend
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


# Añadimos un admin
INSERT INTO Admins (nombre ,email, contraseña) VALUES ('sergi', 'sergimima@gmail.com','test');
