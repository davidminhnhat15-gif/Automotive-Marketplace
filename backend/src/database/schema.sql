--CREATE DATABASE AutomotiveMarketplace;
--GO

USE AutomotiveMarketplace;
GO

CREATE TABLE Users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  username NVARCHAR(100) NOT NULL,
  email NVARCHAR(255) NOT NULL UNIQUE,
  password NVARCHAR(255) NOT NULL,
  role NVARCHAR(50) DEFAULT 'user',
  createdAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Cars (
  id INT IDENTITY(1,1) PRIMARY KEY,
  title NVARCHAR(255) NOT NULL,
  make NVARCHAR(100),
  model NVARCHAR(100),
  year INT,
  price DECIMAL(18,2),
  mileage INT,
  bodyType NVARCHAR(100),
  fuelType NVARCHAR(100),
  imageUrl NVARCHAR(500),
  description NVARCHAR(MAX),
  createdAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE SavedCars (
  id INT IDENTITY(1,1) PRIMARY KEY,
  userId INT NOT NULL,
  carId INT NOT NULL,
  createdAt DATETIME DEFAULT GETDATE(),
  CONSTRAINT FK_SavedCars_Users FOREIGN KEY (userId) REFERENCES Users(id),
  CONSTRAINT FK_SavedCars_Cars FOREIGN KEY (carId) REFERENCES Cars(id),
  CONSTRAINT UQ_SavedCars_UserCar UNIQUE (userId, carId)
);
