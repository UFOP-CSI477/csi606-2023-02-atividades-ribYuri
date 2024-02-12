import { useState, useEffect } from "react";
import CardLocal from "../CardLocal";
import { getLocaisColeta, deleteLocal } from "../../../services/localColeta";

const ListLocal = ({ updated, onEdit }) => {
  const [locais, setLocais] = useState();

  const handleDelete = (id) => {
    deleteLocal(id)
      .then(() => {
        console.log("Deletado com sucesso!");
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
    <div className="locaisCadastrados">
      {locais &&
        locais.map((local) => (
          <div className="locaisItems" key={local.id}>
            <CardLocal
              nome={local.nome}
              rua={local.rua}
              numero={local.numero}
              complemento={local.complemento}
              cidade={local.cidade.nome}
              estado={local.cidade.estado.nome}
              sigla={local.cidade.estado.sigla}
            />
            <button onClick={() => onEdit(local)}>editar</button>
            <button onClick={() => handleDelete(local.id)}>deletar</button>
          </div>
        ))}
    </div>
  );
};

export default ListLocal;
