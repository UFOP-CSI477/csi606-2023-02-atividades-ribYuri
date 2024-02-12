import { api } from "./api";

export const getCidades = async () => {
  const response = await api.get("cidades");
  return response.data;
};

export const postNovaCidade = async (nome, estado_id) => {
  const response = await api.post("cidades", {
    nome,
    estado_id,
  });
  return response.data;
};

export const patchCidade = async (id, nome, estado_id) => {
  const response = await api.patch(`cidades/${id}`, {
    nome,
    estado_id,
  });
  return response.data;
};

export const deleteCidade = async (id) => {
  const response = await api.delete(`cidades/${id}`);
  return response.data;
};
