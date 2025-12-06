import { getToken } from "./authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper to build the Authorization header
function authHeader() {
  return {
    Authorization: `JWT ${getToken()}`,
  };
}

export async function getFavourites() {
  const res = await fetch(`${API_URL}/favourites`, {
    method: "GET",
    headers: authHeader(),
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}
export async function addToFavourites(id) {
  const res = await fetch(`${API_URL}/favourites/${id}`, {
    method: "PUT",
    headers: authHeader(),
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}

export async function removeFromFavourites(id) {
  const res = await fetch(`${API_URL}/favourites/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}
