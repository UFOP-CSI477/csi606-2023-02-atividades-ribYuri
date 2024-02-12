import { useState, useEffect } from "react";
import GenericCard from "../../../components/GenericCard";
import { getCidades, deleteCidade } from "../../../services/cidade";
import { FiEdit, FiTrash } from "react-icons/fi";

const ListCidade = ({ updated, onEdit }) => {
  const [cidades, setCidades] = useState();

  const handleDelete = (id) => {
    deleteCidade(id)
      .then(() => {
        console.log("Cidade deletada com sucesso!");
        setCidades(cidades.filter((e) => e.id != id));
      })
      .catch((error) => console.log(error.response.data.message));
  };

  useEffect(() => {
    getCidades()
      .then((response) => setCidades(response))
      .catch((error) => console.log(error));
  }, [updated]);

  return (
    <div className="genericCardContainer">
      {cidades &&
        cidades.map((cidade) => (
          <div className="genericItems" key={cidade.id}>
            <GenericCard
              campos={[cidade.nome, cidade.estado.nome, cidade.estado.sigla]}
            />
            <div className="editItensButtons">
              <button onClick={() => onEdit(cidade)}>
                <FiEdit color="blue" size={20} />
              </button>
              <button onClick={() => handleDelete(cidade.id)}>
                <FiTrash color="red" size={20} />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListCidade;
