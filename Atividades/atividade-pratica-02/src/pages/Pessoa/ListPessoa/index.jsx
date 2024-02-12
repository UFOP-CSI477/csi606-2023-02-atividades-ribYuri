import { useState, useEffect } from "react";
import GenericCard from "../../../components/GenericCard";
import { getPessoas, deletePessoa } from "../../../services/pessoa";
import { FiEdit, FiTrash } from "react-icons/fi";

const ListPessoa = ({ updated, onEdit }) => {
  const [pessoa, setPessoa] = useState();

  const handleDelete = (id) => {
    deletePessoa(id)
      .then(() => {
        console.log("Pessoa deletada com sucesso!");
        setPessoa(pessoa.filter((e) => e.id != id));
      })
      .catch((error) => console.log(error.response.data.message));
  };

  useEffect(() => {
    getPessoas()
      .then((response) => setPessoa(response))
      .catch((error) => console.log(error));
  }, [updated]);

  return (
    <div className="genericCardContainer">
      {pessoa &&
        pessoa.map((pessoa) => (
          <div className="genericItems" key={pessoa.id}>
            <GenericCard
              campos={[
                pessoa.nome,
                pessoa.rua,
                pessoa.numero,
                pessoa.complemento,
                pessoa.rg,
                pessoa.cidade.nome,
                pessoa.cidade.estado.nome,
                pessoa.cidade.estado.sigla,
                pessoa.tipoSanguineo.tipo,
                pessoa.tipoSanguineo.fator,
              ]}
            />
            <div className="editItensButtons">
              <button onClick={() => onEdit(pessoa)}>
                <FiEdit color="blue" size={20} />
              </button>
              <button onClick={() => handleDelete(pessoa.id)}>
                <FiTrash color="red" size={20} />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListPessoa;
