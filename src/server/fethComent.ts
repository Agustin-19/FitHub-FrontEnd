import { API } from "@/helpers/helper";
import { IComentario } from "@/interface/interface";

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

export const postComents = async (
  comment: IComentario,
  token: string,
  id: string
) => {
  const response = await fetch(`${API}/comments/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment }),
  });
  const data = await response.json();
  return data;
};
