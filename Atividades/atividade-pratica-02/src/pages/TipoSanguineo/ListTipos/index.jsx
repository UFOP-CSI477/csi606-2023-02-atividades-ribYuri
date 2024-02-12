import { useState, useEffect } from "react";
import GenericCard from "../../../components/GenericCard";
import {
  getTiposSanguineos,
  deleteTipoSanguineo,
} from "../../../services/tipoSanguineo";
import { FiEdit, FiTrash } from "react-icons/fi";

const ListTipos = ({ updated, onEdit }) => {
  const [tipoSanguineo, setTipoSanguineo] = useState();

  const handleDelete = (id) => {
    deleteTipoSanguineo(id)
      .then(() => {
        console.log("Tipo deletado com sucesso!");
        setTipoSanguineo(tipoSanguineo.filter((e) => e.id != id));
      })
      .catch((error) => console.log(error.response.data.message));
  };

  useEffect(() => {
    getTiposSanguineos()
      .then((response) => setTipoSanguineo(response))
      .catch((error) => console.log(error));
  }, [updated]);

  return (
    <div className="genericCardContainer">
      {tipoSanguineo &&
        tipoSanguineo.map((sangue) => (
          <div className="genericItems" key={sangue.id}>
            <GenericCard campos={[sangue.tipo, sangue.fator]} />
            <div className="editItensButtons">
              <button onClick={() => onEdit(sangue)}>
                <FiEdit color="blue" size={20} />
              </button>
              <button onClick={() => handleDelete(sangue.id)}>
                <FiTrash color="red" size={20} />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListTipos;
