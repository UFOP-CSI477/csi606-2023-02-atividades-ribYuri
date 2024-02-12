import { api } from "./api";

export const getPessoas = async () => {
  const response = await api.get("pessoas");
  return response.data;
};

export const postNovaPessoa = async (
  nome,
  rua,
  numero,
  complemento,
  rg,
  cidade_id,
  tipoSanguineo_id
) => {
  const response = await api.post("pessoas", {
    nome,
    rua,
    numero,
    complemento,
    rg,
    cidade_id,
    tipoSanguineo_id,
  });
  return response.data;
};

export const patchPessoa = async (
  id,
  nome,
  rua,
  numero,
  complemento,
  rg,
  cidade_id,
  tipoSanguineo_id
) => {
  const response = await api.patch(`pessoas/${id}`, {
    nome,
    rua,
    numero,
    complemento,
    rg,
    cidade_id,
    tipoSanguineo_id,
  });
  return response.data;
};

export const deletePessoa = async (id) => {
  const response = await api.delete(`pessoas/${id}`);
  return response.data;
};
