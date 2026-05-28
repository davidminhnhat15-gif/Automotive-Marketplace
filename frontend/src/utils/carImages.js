const dealImageByTitle = {
  "2021 toyota corolla": "/img/deals/Corolla.jpg",
  "2020 hyundai elantra": "/img/deals/Elantra.jpg",
  "2021 kia forte": "/img/deals/Forte.jpg",
  "2020 nissan sentra": "/img/deals/Sentra.jpg",
};

export function getCarImageUrl(car) {
  const title = car?.title?.toLowerCase();

  return dealImageByTitle[title] || car?.imageUrl || "/img/car.jpg";
}
