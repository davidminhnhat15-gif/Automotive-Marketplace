USE AutomotiveMarketplace;
GO

BEGIN TRANSACTION;

WITH RankedCars AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY bodyType
      ORDER BY
        CASE
          WHEN title IN (
            '2021 Toyota Corolla',
            '2020 Hyundai Elantra',
            '2021 Kia Forte',
            '2020 Nissan Sentra'
          ) THEN 0
          ELSE 1
        END,
        createdAt DESC,
        id DESC
    ) AS rowNumber
  FROM Cars
)
DELETE FROM SavedCars
WHERE carId IN (
  SELECT id
  FROM RankedCars
  WHERE rowNumber > 5
);

WITH RankedCars AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY bodyType
      ORDER BY
        CASE
          WHEN title IN (
            '2021 Toyota Corolla',
            '2020 Hyundai Elantra',
            '2021 Kia Forte',
            '2020 Nissan Sentra'
          ) THEN 0
          ELSE 1
        END,
        createdAt DESC,
        id DESC
    ) AS rowNumber
  FROM Cars
)
DELETE FROM Cars
WHERE id IN (
  SELECT id
  FROM RankedCars
  WHERE rowNumber > 5
);

UPDATE Cars
SET imageUrl = CASE title
  WHEN '2021 Toyota Corolla' THEN '/img/deals/Corolla.jpg'
  WHEN '2020 Hyundai Elantra' THEN '/img/deals/Elantra.jpg'
  WHEN '2021 Kia Forte' THEN '/img/deals/Forte.jpg'
  WHEN '2020 Nissan Sentra' THEN '/img/deals/Sentra.jpg'
  ELSE imageUrl
END
WHERE title IN (
  '2021 Toyota Corolla',
  '2020 Hyundai Elantra',
  '2021 Kia Forte',
  '2020 Nissan Sentra'
);

COMMIT TRANSACTION;
GO

SELECT bodyType, COUNT(*) AS totalCars
FROM Cars
GROUP BY bodyType
ORDER BY bodyType;
GO
