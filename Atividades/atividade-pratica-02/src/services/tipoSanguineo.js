import { api } from "./api";

export const getTiposSanguineos = async () => {
  const response = await api.get("sangue/tipos");
  return response.data;
};

export const postNovoTipoSanguineo = async (tipo, fator) => {
  const response = await api.post("sangue/tipos", { tipo, fator });
  return response.data;
};

export const patchTipoSanguineo = async (id, tipo, fator) => {
  const response = await api.patch(`sangue/tipos/${id}`, { tipo, fator });
  return response.data;
};

export const deleteTipoSanguineo = async (id) => {
  const response = await api.delete(`sangue/tipos/${id}`);
  return response.data;
};
