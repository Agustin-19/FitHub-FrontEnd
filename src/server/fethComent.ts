import { API } from "@/helpers/helper";

export const fetchComents = async (token: string, id: string) => {
  const response = await fetch(`${API}/comments/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
