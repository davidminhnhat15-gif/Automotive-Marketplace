USE AutomotiveMarketplace;
GO

IF NOT EXISTS (SELECT 1 FROM Cars WHERE title = '2021 Toyota Corolla')
BEGIN
  INSERT INTO Cars
    (title, make, model, year, price, mileage, bodyType, fuelType, imageUrl, description)
  VALUES
    ('2021 Toyota Corolla', 'Toyota', 'Corolla', 2021, 15900, 42000, 'sedan', 'Gasoline', '/img/deals/corolla.png', 'Reliable used compact sedan listed as a great price deal.');
END;
GO

IF NOT EXISTS (SELECT 1 FROM Cars WHERE title = '2020 Hyundai Elantra')
BEGIN
  INSERT INTO Cars
    (title, make, model, year, price, mileage, bodyType, fuelType, imageUrl, description)
  VALUES
    ('2020 Hyundai Elantra', 'Hyundai', 'Elantra', 2020, 14800, 48000, 'sedan', 'Gasoline', '/img/deals/elantra.png', 'Affordable used sedan with strong value and reliable daily comfort.');
END;
GO

IF NOT EXISTS (SELECT 1 FROM Cars WHERE title = '2021 Kia Forte')
BEGIN
  INSERT INTO Cars
    (title, make, model, year, price, mileage, bodyType, fuelType, imageUrl, description)
  VALUES
    ('2021 Kia Forte', 'Kia', 'Forte', 2021, 15500, 39000, 'sedan', 'Gasoline', '/img/deals/forte.png', 'Compact used sedan with low ownership costs and practical features.');
END;
GO

IF NOT EXISTS (SELECT 1 FROM Cars WHERE title = '2020 Nissan Sentra')
BEGIN
  INSERT INTO Cars
    (title, make, model, year, price, mileage, bodyType, fuelType, imageUrl, description)
  VALUES
    ('2020 Nissan Sentra', 'Nissan', 'Sentra', 2020, 14900, 45000, 'sedan', 'Gasoline', '/img/deals/sentra.png', 'Comfortable used compact sedan included in best car deals.');
END;
GO
