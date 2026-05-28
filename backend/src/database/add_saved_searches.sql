USE AutomotiveMarketplace;
GO

IF NOT EXISTS (
  SELECT 1
  FROM sys.tables
  WHERE name = 'SavedSearches'
)
BEGIN
  CREATE TABLE SavedSearches (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    name NVARCHAR(255) NOT NULL,
    make NVARCHAR(100),
    model NVARCHAR(100),
    bodyType NVARCHAR(100),
    fuelType NVARCHAR(100),
    minPrice DECIMAL(18,2),
    maxPrice DECIMAL(18,2),
    minYear INT,
    maxYear INT,
    search NVARCHAR(255),
    createdAt DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_SavedSearches_Users FOREIGN KEY (userId) REFERENCES Users(id)
  );
END;
GO
