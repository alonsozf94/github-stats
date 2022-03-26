import apiFetch from "./api-fetch";

export async function favorites() {
  return await apiFetch("favorites");
}

export async function createFavorite({ name, username, avatar_url }) {
  return await apiFetch("favorites", { body: { name, username, avatar_url } });
}

export async function destroyFavorite(id) {
  return await apiFetch(`favorites/${id}`, { method: "DELETE" });
}
