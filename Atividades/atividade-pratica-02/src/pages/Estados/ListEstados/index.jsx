import { useState, useEffect } from "react";
import GenericCard from "../../../components/GenericCard";
import { getEstados, deleteEstado } from "../../../services/estado";
import { FiEdit, FiTrash } from "react-icons/fi";

const ListEstados = ({ updated, onEdit }) => {
  const [estados, setEstados] = useState();

  const handleDelete = (id) => {
    deleteEstado(id)
      .then(() => {
        console.log("Estado deletado com sucesso!");
        setEstados(estados.filter((e) => e.id != id));
      })
      .catch((error) => console.log(error.response.data.message));
  };

  useEffect(() => {
    getEstados()
      .then((response) => setEstados(response))
      .catch((error) => console.log(error));
  }, [updated]);

  return (
    <div className="genericCardContainer">
      {estados &&
        estados.map((estado) => (
          <div className="genericItems" key={estado.id}>
            <GenericCard campos={[estado.nome, estado.sigla]} />
            <div className="editItensButtons">
              <button onClick={() => onEdit(estado)}>
                <FiEdit color="blue" size={20} />
              </button>
              <button onClick={() => handleDelete(estado.id)}>
                <FiTrash color="red" size={20} />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListEstados;
