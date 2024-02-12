import { api } from "./api";

export const getEstado = async () => {
  const response = await api.get("estados");
  return response.data;
};

export const postNovoEstado = async (nome, sigla) => {
  const response = await api.post("estados", { nome, sigla });
  return response.data;
};
