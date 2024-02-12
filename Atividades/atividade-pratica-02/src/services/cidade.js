import { api } from "./api";

export const getCidades = async () => {
    const response = await api.get("cidades");
    return response.data;
}

export const postNovaCidade = async (nome, estado_id) => {
    const response = await api.post("cidades", {nome, estado_id})
    return response.data;
}