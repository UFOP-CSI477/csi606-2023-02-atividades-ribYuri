import { useState, useEffect } from "react";
import GenericCard from "../../../components/GenericCard";
import { getLocaisColeta, deleteLocal } from "../../../services/localColeta";
import { FiEdit, FiTrash } from "react-icons/fi";

const ListLocal = ({ updated, onEdit }) => {
  const [locais, setLocais] = useState();

  const handleDelete = (id) => {
    deleteLocal(id)
      .then(() => {
        console.log("Local deletado com sucesso!");
        setLocais(locais.filter((e) => e.id != id));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getLocaisColeta()
      .then((response) => setLocais(response))
      .catch((error) => console.log(error));
  }, [updated]);

  return (
    <div className="genericCardContainer">
      {locais &&
        locais.map((local) => (
          <div className="genericItems" key={local.id}>
            <GenericCard
              campos={[
                local.nome,
                local.rua,
                local.numero,
                local.complemento,
                local.cidade.nome,
                local.cidade.estado.nome,
                local.cidade.estado.sigla,
              ]}
            />
            <div className="editItensButtons">
              <button onClick={() => onEdit(local)}>
                <FiEdit color="blue" size={20} />
              </button>
              <button onClick={() => handleDelete(local.id)}>
                <FiTrash color="red" size={20} />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListLocal;
