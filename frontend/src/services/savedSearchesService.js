import { authHeaders, requestJson } from "./api";

export async function getSavedSearches() {
  return requestJson("/saved-searches", {
    headers: authHeaders(),
  });
}

export async function createSavedSearch(search) {
  return requestJson("/saved-searches", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(search),
  });
}

export async function deleteSavedSearch(id) {
  return requestJson(`/saved-searches/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}
