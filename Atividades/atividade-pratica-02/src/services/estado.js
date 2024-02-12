import { api } from "./api";

export const getEstados = async () => {
  const response = await api.get("estados");
  return response.data;
};

export const postNovoEstado = async (nome, sigla) => {
  const response = await api.post("estados", {
    nome,
    sigla,
  });
  return response.data;
};

export const patchEstado = async (id, nome, sigla) => {
  const response = await api.patch(`estados/${id}`, {
    nome,
    sigla,
  });
  return response.data;
};

export const deleteEstado = async (id) => {
  const response = await api.delete(`estados/${id}`);
  return response.data;
};
