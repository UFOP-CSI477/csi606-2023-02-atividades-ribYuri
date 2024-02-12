import { useState, useEffect } from "react";
import GenericCard from "../../../components/GenericCard";
import { getDoacoes, deleteDoacao } from "../../../services/doacao";
import { FiEdit, FiTrash } from "react-icons/fi";

const ListDoacao = ({ updated, onEdit }) => {
  const [doacao, setDoacao] = useState();

  const handleDelete = (id) => {
    deleteDoacao(id)
      .then(() => {
        console.log("Doação deletada com sucesso!");
        setDoacao(doacao.filter((e) => e.id != id));
      })
      .catch((error) => console.log(error.response.data.message));
  };

  useEffect(() => {
    getDoacoes()
      .then((response) => setDoacao(response))
      .catch((error) => console.log(error));
  }, [updated]);

  return (
    <div className="genericCardContainer">
      {doacao &&
        doacao.map((doacao) => (
          <div className="genericItems" key={doacao.id}>
            <GenericCard
              campos={[
                doacao.pessoa.nome,
                doacao.pessoa.rg,
                doacao.pessoa.tipoSanguineo.tipo,
                doacao.pessoa.tipoSanguineo.fator,
                doacao.localColeta.nome,
                doacao.localColeta.cidade.nome,
                doacao.localColeta.cidade.estado.sigla,
                doacao.data.substr(0, 10),
              ]}
            />
            <div className="editItensButtons">
              <button onClick={() => onEdit(doacao)}>
                <FiEdit color="blue" size={20} />
              </button>
              <button onClick={() => handleDelete(doacao.id)}>
                <FiTrash color="red" size={20} />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListDoacao;
