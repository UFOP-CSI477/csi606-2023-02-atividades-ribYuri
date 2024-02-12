import { api } from "./api";

export const getLocaisColeta = async () => {
  const response = await api.get("coleta/local");
  return response.data;
};

export const postNovoLocal = async (
  nome,
  rua,
  numero,
  complemento,
  cidade_id
) => {
  const response = await api.post("coleta/local", {
    nome,
    rua,
    numero,
    complemento,
    cidade_id,
  });
  return response.data;
};

export const patchNovoLocal = async (
  id,
  nome,
  rua,
  numero,
  complemento,
  cidade_id
) => {
  const response = await api.patch(`coleta/local/${id}`, {
    nome,
    rua,
    numero,
    complemento,
    cidade_id,
  });
  return response.data;
};

export const deleteLocal = async (id) => {
  const response = await api.delete(`coleta/local/${id}`);
  return response.data;
};
