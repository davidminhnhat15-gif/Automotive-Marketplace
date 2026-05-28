USE AutomotiveMarketplace;
GO

INSERT INTO Cars
  (title, make, model, year, price, mileage, bodyType, fuelType, imageUrl, description)
VALUES
  -- Sedans: mid to high
  ('2022 Toyota Camry SE', 'Toyota', 'Camry', 2022, 25500, 21000, 'sedan', 'Gasoline', '/img/cars/toyota-camry.jpg', 'Reliable midsize sedan with strong value and everyday comfort.'),
  ('2023 Honda Accord EX', 'Honda', 'Accord', 2023, 28900, 16000, 'sedan', 'Gasoline', '/img/cars/honda-accord.jpg', 'Spacious sedan with refined handling and modern driver assistance.'),
  ('2023 Hyundai Sonata SEL', 'Hyundai', 'Sonata', 2023, 29750, 13000, 'sedan', 'Gasoline', '/img/cars/hyundai-sonata.jpg', 'Sharp styling, roomy cabin, and strong feature value.'),
  ('2023 Mazda Mazda3 Premium', 'Mazda', 'Mazda3', 2023, 31800, 12000, 'sedan', 'Gasoline', '/img/cars/mazda3.jpg', 'Compact sedan with upscale interior and sporty steering.'),
  ('2022 Volkswagen Arteon SEL R-Line', 'Volkswagen', 'Arteon', 2022, 36900, 18000, 'sedan', 'Gasoline', '/img/cars/volkswagen-arteon.jpg', 'Premium fastback sedan with generous space and distinctive style.'),
  ('2023 Kia Stinger GT-Line', 'Kia', 'Stinger', 2023, 39800, 15000, 'sedan', 'Gasoline', '/img/cars/kia-stinger.jpg', 'Sport sedan feel with practical liftback cargo space.'),
  ('2023 Lexus ES 350', 'Lexus', 'ES', 2023, 44900, 11000, 'sedan', 'Gasoline', '/img/cars/lexus-es.jpg', 'Quiet luxury sedan known for comfort and reliability.'),
  ('2023 BMW 330i', 'BMW', '3 Series', 2023, 46800, 14000, 'sedan', 'Gasoline', '/img/cars/bmw-330i.jpg', 'Sporty premium sedan with balanced performance and tech.'),
  ('2023 Mercedes-Benz C 300', 'Mercedes-Benz', 'C-Class', 2023, 49200, 10000, 'sedan', 'Gasoline', '/img/cars/mercedes-c300.jpg', 'Luxury compact sedan with elegant cabin and smooth power.'),
  ('2023 Genesis G80 3.5T', 'Genesis', 'G80', 2023, 62800, 9000, 'sedan', 'Gasoline', '/img/cars/genesis-g80.jpg', 'Executive sedan with strong performance and premium materials.'),

  -- SUVs and crossovers: mid to high
  ('2022 Toyota RAV4 XLE', 'Toyota', 'RAV4', 2022, 28900, 22000, 'suv', 'Gasoline', '/img/cars/toyota-rav4.jpg', 'Popular compact SUV with excellent practicality.'),
  ('2023 Honda CR-V EX-L', 'Honda', 'CR-V', 2023, 34200, 15000, 'suv', 'Gasoline', '/img/cars/honda-crv.jpg', 'Comfortable compact SUV with generous cargo space.'),
  ('2023 Mazda CX-5 Premium Plus', 'Mazda', 'CX-5', 2023, 36500, 13000, 'suv', 'Gasoline', '/img/cars/mazda-cx5.jpg', 'Upscale compact crossover with polished driving feel.'),
  ('2023 Hyundai Santa Fe Limited', 'Hyundai', 'Santa Fe', 2023, 38900, 12000, 'suv', 'Gasoline', '/img/cars/hyundai-santa-fe.jpg', 'Feature-rich midsize SUV with a comfortable cabin.'),
  ('2023 Subaru Outback Touring XT', 'Subaru', 'Outback', 2023, 41900, 10000, 'suv', 'Gasoline', '/img/cars/subaru-outback.jpg', 'Adventure-focused crossover with standard all-wheel drive.'),
  ('2023 Jeep Grand Cherokee Limited', 'Jeep', 'Grand Cherokee', 2023, 47800, 11000, 'suv', 'Gasoline', '/img/cars/jeep-grand-cherokee.jpg', 'Midsize SUV with premium options and off-road heritage.'),
  ('2023 Volvo XC60 Plus', 'Volvo', 'XC60', 2023, 51400, 9000, 'suv', 'Gasoline', '/img/cars/volvo-xc60.jpg', 'Stylish luxury crossover with strong safety technology.'),
  ('2023 BMW X5 xDrive40i', 'BMW', 'X5', 2023, 68900, 10000, 'suv', 'Gasoline', '/img/cars/bmw-x5.jpg', 'Luxury midsize SUV with strong performance and refinement.'),
  ('2023 Mercedes-Benz GLE 350', 'Mercedes-Benz', 'GLE', 2023, 72400, 8500, 'suv', 'Gasoline', '/img/cars/mercedes-gle.jpg', 'Premium SUV with a quiet ride and advanced cabin tech.'),
  ('2023 Range Rover Sport SE', 'Land Rover', 'Range Rover Sport', 2023, 86900, 7000, 'suv', 'Gasoline', '/img/cars/range-rover-sport.jpg', 'High-end SUV with luxury presence and capability.'),

  -- Luxury
  ('2023 Lexus RX 350 Premium', 'Lexus', 'RX', 2023, 52600, 11000, 'luxury', 'Gasoline', '/img/cars/lexus-rx.jpg', 'Luxury crossover with a calm cabin and strong ownership value.'),
  ('2023 Genesis GV80 3.5T', 'Genesis', 'GV80', 2023, 62900, 9500, 'luxury', 'Gasoline', '/img/cars/genesis-gv80.jpg', 'Elegant luxury SUV with premium design and power.'),
  ('2023 Audi Q7 Premium Plus', 'Audi', 'Q7', 2023, 69400, 10000, 'luxury', 'Gasoline', '/img/cars/audi-q7.jpg', 'Three-row luxury SUV with refined driving dynamics.'),
  ('2023 BMW 740i', 'BMW', '7 Series', 2023, 94500, 8000, 'luxury', 'Gasoline', '/img/cars/bmw-740i.jpg', 'Flagship luxury sedan with advanced technology.'),
  ('2023 Mercedes-Benz S 500', 'Mercedes-Benz', 'S-Class', 2023, 118900, 7000, 'luxury', 'Gasoline', '/img/cars/mercedes-s500.jpg', 'Benchmark luxury sedan with exceptional comfort.'),
  ('2023 Porsche Panamera 4', 'Porsche', 'Panamera', 2023, 109800, 6000, 'luxury', 'Gasoline', '/img/cars/porsche-panamera.jpg', 'Performance luxury sedan with grand touring character.'),
  ('2023 Land Rover Range Rover P400', 'Land Rover', 'Range Rover', 2023, 123500, 6500, 'luxury', 'Gasoline', '/img/cars/range-rover.jpg', 'Prestige SUV with high-end comfort and road presence.'),
  ('2023 Mercedes-Benz G 550', 'Mercedes-Benz', 'G-Class', 2023, 148900, 5000, 'luxury', 'Gasoline', '/img/cars/mercedes-g550.jpg', 'Iconic luxury SUV with rugged style and premium cabin.'),
  ('2023 Bentley Bentayga V8', 'Bentley', 'Bentayga', 2023, 212000, 4500, 'luxury', 'Gasoline', '/img/cars/bentley-bentayga.jpg', 'Ultra-luxury SUV with handcrafted interior details.'),
  ('2023 Rolls-Royce Ghost', 'Rolls-Royce', 'Ghost', 2023, 348000, 3000, 'luxury', 'Gasoline', '/img/cars/rolls-royce-ghost.jpg', 'Ultra-premium sedan focused on effortless comfort.'),

  -- Hybrid
  ('2022 Toyota Prius XLE', 'Toyota', 'Prius', 2022, 27900, 18000, 'hybrid', 'Hybrid', '/img/cars/toyota-prius.jpg', 'Efficient hatchback hybrid with excellent fuel economy.'),
  ('2023 Toyota Corolla Hybrid SE', 'Toyota', 'Corolla Hybrid', 2023, 28900, 14000, 'hybrid', 'Hybrid', '/img/cars/corolla-hybrid.jpg', 'Compact hybrid sedan with low running costs.'),
  ('2023 Honda Accord Hybrid EX-L', 'Honda', 'Accord Hybrid', 2023, 36500, 12000, 'hybrid', 'Hybrid', '/img/cars/accord-hybrid.jpg', 'Midsize hybrid sedan with strong efficiency and comfort.'),
  ('2023 Toyota Camry Hybrid XLE', 'Toyota', 'Camry Hybrid', 2023, 38200, 11000, 'hybrid', 'Hybrid', '/img/cars/camry-hybrid.jpg', 'Comfortable hybrid sedan with proven reliability.'),
  ('2023 Hyundai Tucson Hybrid Limited', 'Hyundai', 'Tucson Hybrid', 2023, 40200, 10000, 'hybrid', 'Hybrid', '/img/cars/tucson-hybrid.jpg', 'Compact hybrid SUV with modern tech and style.'),
  ('2023 Kia Sportage Hybrid SX Prestige', 'Kia', 'Sportage Hybrid', 2023, 41800, 9500, 'hybrid', 'Hybrid', '/img/cars/sportage-hybrid.jpg', 'Feature-rich hybrid crossover with strong value.'),
  ('2023 Toyota Highlander Hybrid Limited', 'Toyota', 'Highlander Hybrid', 2023, 48900, 9000, 'hybrid', 'Hybrid', '/img/cars/highlander-hybrid.jpg', 'Three-row hybrid SUV for families and road trips.'),
  ('2023 Lexus NX 350h', 'Lexus', 'NX Hybrid', 2023, 50900, 8000, 'hybrid', 'Hybrid', '/img/cars/lexus-nx-hybrid.jpg', 'Luxury compact hybrid SUV with quiet comfort.'),
  ('2023 Lexus RX 500h F Sport', 'Lexus', 'RX Hybrid', 2023, 67400, 7000, 'hybrid', 'Hybrid', '/img/cars/lexus-rx-hybrid.jpg', 'Performance-oriented luxury hybrid crossover.'),
  ('2023 Volvo XC90 Recharge', 'Volvo', 'XC90 Recharge', 2023, 76800, 6000, 'hybrid', 'Plug-in Hybrid', '/img/cars/volvo-xc90-recharge.jpg', 'Premium plug-in hybrid SUV with three-row versatility.'),

  -- Wagons
  ('2022 Subaru Outback Premium', 'Subaru', 'Outback', 2022, 31900, 19000, 'wagon', 'Gasoline', '/img/cars/subaru-outback-premium.jpg', 'Practical wagon-style crossover with all-weather confidence.'),
  ('2023 Mini Clubman Cooper S', 'MINI', 'Clubman', 2023, 36900, 11000, 'wagon', 'Gasoline', '/img/cars/mini-clubman.jpg', 'Compact wagon with playful character and premium feel.'),
  ('2023 Volvo V60 Cross Country', 'Volvo', 'V60 Cross Country', 2023, 49800, 9000, 'wagon', 'Gasoline', '/img/cars/volvo-v60.jpg', 'Premium wagon with Scandinavian design and added ride height.'),
  ('2023 Audi A4 Allroad Premium Plus', 'Audi', 'A4 Allroad', 2023, 52400, 8500, 'wagon', 'Gasoline', '/img/cars/audi-a4-allroad.jpg', 'Luxury wagon with quattro all-wheel drive and daily comfort.'),
  ('2023 Mercedes-Benz E 450 All-Terrain', 'Mercedes-Benz', 'E-Class All-Terrain', 2023, 72800, 7000, 'wagon', 'Gasoline', '/img/cars/mercedes-e-all-terrain.jpg', 'Upscale wagon with refined ride quality and versatility.'),
  ('2023 Volvo V90 Cross Country', 'Volvo', 'V90 Cross Country', 2023, 74200, 6500, 'wagon', 'Gasoline', '/img/cars/volvo-v90.jpg', 'Elegant luxury wagon with generous cargo space.'),
  ('2022 Porsche Taycan Sport Turismo', 'Porsche', 'Taycan Sport Turismo', 2022, 94500, 8000, 'wagon', 'Electric', '/img/cars/taycan-sport-turismo.jpg', 'Electric performance wagon with Porsche dynamics.'),
  ('2023 Audi RS 6 Avant', 'Audi', 'RS 6 Avant', 2023, 128900, 5000, 'wagon', 'Gasoline', '/img/cars/audi-rs6-avant.jpg', 'High-performance luxury wagon with supercar pace.'),
  ('2023 Porsche Panamera Sport Turismo GTS', 'Porsche', 'Panamera Sport Turismo', 2023, 142000, 4500, 'wagon', 'Gasoline', '/img/cars/panamera-sport-turismo.jpg', 'Premium sport wagon with grand touring comfort.'),
  ('2023 Porsche Taycan Turbo Cross Turismo', 'Porsche', 'Taycan Cross Turismo', 2023, 154000, 4000, 'wagon', 'Electric', '/img/cars/taycan-cross-turismo.jpg', 'High-end electric wagon with rapid acceleration and utility.'),

  -- Convertibles
  ('2023 Mazda MX-5 Miata Grand Touring', 'Mazda', 'MX-5 Miata', 2023, 34900, 9000, 'convertible', 'Gasoline', '/img/cars/mazda-miata.jpg', 'Lightweight roadster with excellent handling.'),
  ('2023 Ford Mustang EcoBoost Premium Convertible', 'Ford', 'Mustang', 2023, 40500, 10000, 'convertible', 'Gasoline', '/img/cars/mustang-convertible.jpg', 'Classic American convertible with modern tech.'),
  ('2023 Mini Convertible Cooper S', 'MINI', 'Convertible', 2023, 42800, 8000, 'convertible', 'Gasoline', '/img/cars/mini-convertible.jpg', 'Compact premium convertible with playful design.'),
  ('2023 BMW 430i Convertible', 'BMW', '4 Series Convertible', 2023, 57400, 7500, 'convertible', 'Gasoline', '/img/cars/bmw-430i-convertible.jpg', 'Premium convertible with balanced performance and comfort.'),
  ('2023 Audi A5 Cabriolet Premium Plus', 'Audi', 'A5 Cabriolet', 2023, 61400, 7000, 'convertible', 'Gasoline', '/img/cars/audi-a5-cabriolet.jpg', 'Elegant all-wheel-drive luxury convertible.'),
  ('2023 Mercedes-Benz C 300 Cabriolet', 'Mercedes-Benz', 'C-Class Cabriolet', 2023, 64600, 6500, 'convertible', 'Gasoline', '/img/cars/mercedes-c-cabriolet.jpg', 'Comfortable luxury convertible with a refined cabin.'),
  ('2023 Chevrolet Corvette Stingray Convertible', 'Chevrolet', 'Corvette', 2023, 78900, 5500, 'convertible', 'Gasoline', '/img/cars/corvette-convertible.jpg', 'Mid-engine sports car with open-air excitement.'),
  ('2023 Porsche 718 Boxster S', 'Porsche', '718 Boxster', 2023, 84800, 5000, 'convertible', 'Gasoline', '/img/cars/porsche-boxster.jpg', 'Driver-focused roadster with premium performance.'),
  ('2023 BMW M4 Competition Convertible', 'BMW', 'M4 Convertible', 2023, 93800, 4500, 'convertible', 'Gasoline', '/img/cars/bmw-m4-convertible.jpg', 'High-performance convertible with serious power.'),
  ('2023 Porsche 911 Carrera Cabriolet', 'Porsche', '911 Cabriolet', 2023, 128500, 3500, 'convertible', 'Gasoline', '/img/cars/porsche-911-cabriolet.jpg', 'Iconic luxury sports convertible with everyday usability.'),

  -- Electric
  ('2023 Chevrolet Bolt EUV Premier', 'Chevrolet', 'Bolt EUV', 2023, 31900, 9000, 'electric', 'Electric', '/img/cars/chevrolet-bolt-euv.jpg', 'Affordable electric crossover with useful range.'),
  ('2023 Nissan Ariya Engage', 'Nissan', 'Ariya', 2023, 45200, 8000, 'electric', 'Electric', '/img/cars/nissan-ariya.jpg', 'Smooth electric crossover with modern interior design.'),
  ('2023 Hyundai Ioniq 5 SEL', 'Hyundai', 'Ioniq 5', 2023, 48900, 7500, 'electric', 'Electric', '/img/cars/hyundai-ioniq5.jpg', 'Stylish EV with fast charging and spacious cabin.'),
  ('2023 Kia EV6 Wind', 'Kia', 'EV6', 2023, 51200, 7000, 'electric', 'Electric', '/img/cars/kia-ev6.jpg', 'Sporty electric crossover with strong range and design.'),
  ('2023 Tesla Model 3 Long Range', 'Tesla', 'Model 3', 2023, 53900, 6000, 'electric', 'Electric', '/img/cars/tesla-model-3.jpg', 'Popular electric sedan with quick acceleration and tech focus.'),
  ('2023 Ford Mustang Mach-E Premium', 'Ford', 'Mustang Mach-E', 2023, 58400, 6500, 'electric', 'Electric', '/img/cars/mustang-mach-e.jpg', 'Electric crossover with strong style and usability.'),
  ('2023 Tesla Model Y Long Range', 'Tesla', 'Model Y', 2023, 62900, 5500, 'electric', 'Electric', '/img/cars/tesla-model-y.jpg', 'Best-selling electric crossover with excellent practicality.'),
  ('2023 BMW i4 eDrive40', 'BMW', 'i4', 2023, 66800, 5000, 'electric', 'Electric', '/img/cars/bmw-i4.jpg', 'Electric sport sedan with premium build quality.'),
  ('2023 Audi e-tron GT Premium Plus', 'Audi', 'e-tron GT', 2023, 109900, 4000, 'electric', 'Electric', '/img/cars/audi-etron-gt.jpg', 'Luxury electric grand tourer with striking design.'),
  ('2023 Porsche Taycan 4S', 'Porsche', 'Taycan', 2023, 118900, 3500, 'electric', 'Electric', '/img/cars/porsche-taycan.jpg', 'Performance EV with premium handling and fast charging.');
