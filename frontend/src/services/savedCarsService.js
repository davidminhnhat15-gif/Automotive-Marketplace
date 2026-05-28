import { authHeaders, requestJson } from "./api";

export async function getSavedCars() {
  return requestJson("/saved-cars", {
    headers: authHeaders(),
  });
}

export async function saveCar(carId) {
  return requestJson(`/saved-cars/${carId}`, {
    method: "POST",
    headers: authHeaders(),
  });
}

export async function removeSavedCar(carId) {
  return requestJson(`/saved-cars/${carId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}
