import { requestJson } from "./api";

export async function getCars(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== "All") {
      query.append(key, value);
    }
  });

  return requestJson(`/cars${query.toString() ? `?${query}` : ""}`);
}

export async function getCarById(id) {
  return requestJson(`/cars/${id}`);
}
