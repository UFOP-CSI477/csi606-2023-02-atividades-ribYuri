import { api } from "./api";

export const getDoacoes = async () => {
  const response = await api.get("doacoes");
  return response.data;
};

export const postNovaDoacao = async (pessoa_id, localColeta_id, data) => {
  const response = await api.post("doacoes", {
    pessoa_id,
    localColeta_id,
    data,
  });
  return response.data;
};

export const patchDoacao = async (id, pessoa_id, localColeta_id, data) => {
  const response = await api.patch(`doacoes/${id}`, {
    pessoa_id,
    localColeta_id,
    data,
  });
  return response.data;
};

export const deleteDoacao = async (id) => {
  const response = await api.delete(`doacoes/${id}`);
  return response.data;
};
