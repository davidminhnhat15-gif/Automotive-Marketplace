USE AutomotiveMarketplace;
GO

UPDATE Cars
SET imageUrl = CASE title
  WHEN '2023 BMW M4 Competition Convertible' THEN '/img/cars/2023-BMW-M4.jpg'
  WHEN '2023 Chevrolet Corvette Stingray Convertible' THEN '/img/cars/2023-Chevrolet-Corvette-Stingray-Convertible.jpg'
  WHEN '2023 Mercedes-Benz C 300 Cabriolet' THEN '/img/cars/2023-Mercedes-C300-Cabriolet.jpg'
  WHEN '2023 Porsche 718 Boxster S' THEN '/img/cars/2023-Porsche-718.jpg'
  WHEN '2023 Porsche 911 Carrera Cabriolet' THEN '/img/cars/2023-Porsche-911-Carrera-Cabriolet.jpg'
  WHEN '2023 Audi e-tron GT Premium Plus' THEN '/img/cars/2023-Audi-e-tron-GT-quattro-Premium-Plus.jpg'
  WHEN '2023 BMW i4 eDrive40' THEN '/img/cars/2023-BMW-i4.jpg'
  WHEN '2023 Ford Mustang Mach-E Premium' THEN '/img/cars/2023-Ford-Mustang-Mach.jpeg'
  WHEN '2023 Porsche Taycan 4S' THEN '/img/cars/2023-Porsche-Taycan-4S.jpg'
  WHEN '2023 Tesla Model Y Long Range' THEN '/img/cars/2023-Tesla-Model-Y.jpg'
  WHEN '2023 Kia Sportage Hybrid SX Prestige' THEN '/img/cars/2023-Kia-Sportage-SX-23.jpg'
  WHEN '2023 Lexus NX 350h' THEN '/img/cars/2023-Lexus-NX-350.jpg'
  WHEN '2023 Lexus RX 500h F Sport' THEN '/img/cars/2023-Lexus-RX-500h.jpg'
  WHEN '2023 Toyota Highlander Hybrid Limited' THEN '/img/cars/2023-Toyota-Highlander.jpg'
  WHEN '2023 Volvo XC90 Recharge' THEN '/img/cars/2023-Volvo-XC90.jpg'
  WHEN '2023 Bentley Bentayga V8' THEN '/img/cars/2023 Bentley.jpg'
  WHEN '2023 Land Rover Range Rover P400' THEN '/img/cars/Range Rover P400.jpg'
  WHEN '2023 Mercedes-Benz G 550' THEN '/img/cars/2023 Benz G550.jpg'
  WHEN '2023 Porsche Panamera 4' THEN '/img/cars/Porsche Panamera 4.webp'
  WHEN '2023 Rolls-Royce Ghost' THEN '/img/cars/2023-Rolls-Royce-Ghost.jpg'
  WHEN '2024 Toyota Corolla XSE' THEN '/img/cars/2024-Corolla-XSE.jpg'
  WHEN '2023 BMW X5 xDrive40i' THEN '/img/cars/2023-BMW-X5.jpg'
  WHEN '2023 Jeep Grand Cherokee Limited' THEN '/img/cars/Jeep Grand Cherokee.jpg'
  WHEN '2023 Mercedes-Benz GLE 350' THEN '/img/cars/2023-Mercedes-Benz-GLE-350.jpg'
  WHEN '2023 Range Rover Sport SE' THEN '/img/cars/Rang rover SE.jpg'
  WHEN '2023 Volvo XC60 Plus' THEN '/img/cars/Volco XC60.jpg'
  WHEN '2022 Porsche Taycan Sport Turismo' THEN '/img/cars/2022-Porsche-Taycan.jpg'
  WHEN '2023 Audi RS 6 Avant' THEN '/img/cars/2023_Audi_RS6_Avant.jpeg'
  WHEN '2023 Porsche Panamera Sport Turismo GTS' THEN '/img/cars/Porsche Panamera 4.webp'
  WHEN '2023 Porsche Taycan Turbo Cross Turismo' THEN '/img/cars/2023-Porsche-Taycan.jpg'
  WHEN '2023 Volvo V90 Cross Country' THEN '/img/cars/2023-Volvo-V90.jpg'
  ELSE imageUrl
END
WHERE title IN (
  '2023 BMW M4 Competition Convertible',
  '2023 Chevrolet Corvette Stingray Convertible',
  '2023 Mercedes-Benz C 300 Cabriolet',
  '2023 Porsche 718 Boxster S',
  '2023 Porsche 911 Carrera Cabriolet',
  '2023 Audi e-tron GT Premium Plus',
  '2023 BMW i4 eDrive40',
  '2023 Ford Mustang Mach-E Premium',
  '2023 Porsche Taycan 4S',
  '2023 Tesla Model Y Long Range',
  '2023 Kia Sportage Hybrid SX Prestige',
  '2023 Lexus NX 350h',
  '2023 Lexus RX 500h F Sport',
  '2023 Toyota Highlander Hybrid Limited',
  '2023 Volvo XC90 Recharge',
  '2023 Bentley Bentayga V8',
  '2023 Land Rover Range Rover P400',
  '2023 Mercedes-Benz G 550',
  '2023 Porsche Panamera 4',
  '2023 Rolls-Royce Ghost',
  '2024 Toyota Corolla XSE',
  '2023 BMW X5 xDrive40i',
  '2023 Jeep Grand Cherokee Limited',
  '2023 Mercedes-Benz GLE 350',
  '2023 Range Rover Sport SE',
  '2023 Volvo XC60 Plus',
  '2022 Porsche Taycan Sport Turismo',
  '2023 Audi RS 6 Avant',
  '2023 Porsche Panamera Sport Turismo GTS',
  '2023 Porsche Taycan Turbo Cross Turismo',
  '2023 Volvo V90 Cross Country'
);
GO
