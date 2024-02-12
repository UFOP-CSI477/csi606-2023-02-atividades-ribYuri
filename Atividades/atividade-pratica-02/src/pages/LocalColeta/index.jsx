import { useState } from "react";
import { patchNovoLocal, postNovoLocal } from "../../services/localColeta";
import ListLocal from "./ListLocal";
import LocalForms from "./LocalForms";

const LocalColeta = () => {
  const [updated, setUpdated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editLocal, setEditLocal] = useState();

  const saveLocal = (novoLocal) => {
    postNovoLocal(
      novoLocal.nome,
      novoLocal.rua,
      novoLocal.numero,
      novoLocal.complemento,
      novoLocal.cidade.id
    )
      .then(() => {
        console.log("Local salvo com sucesso!");
        setUpdated((prev) => !prev);
      })
      .catch((error) => console.log(error));
  };

  const saveUpdatedLocal = (editLocal) => {
    patchNovoLocal(
      editLocal.id,
      editLocal.nome,
      editLocal.rua,
      editLocal.numero,
      editLocal.complemento,
      editLocal.cidade.id
    )
      .then(() => {
        console.log("Local atualizado com sucesso!");
        setUpdated((prev) => !prev);
      })
      .catch((error) => console.log(error));
  };

  const changeEditMode = () => setEditMode((prev) => !prev);

  const handleEditMode = (local) => {
    setEditLocal(local);
    changeEditMode((prev) => !prev);
  };

  const handleSubmit = (e, novoLocal) => {
    e.preventDefault();
    saveLocal(novoLocal);
    setUpdated((prev) => !prev);
  };

  const handleEditSubmit = (e, editLocal) => {
    e.preventDefault();
    saveUpdatedLocal(editLocal);
    setEditMode((prev) => !prev);
  };

  return (
    <div className="genericContainer">
      {editMode ? (
        <LocalForms
          handleSubmit={handleEditSubmit}
          title={"Editando Local"}
          editLocal={editLocal}
          handleCancelEdit={changeEditMode}
          mode="edit"
          update={true}
        />
      ) : (
        <>
          <LocalForms
            handleSubmit={handleSubmit}
            title={"Cadastro de Local de Coleta"}
          />
          <ListLocal updated={updated} onEdit={handleEditMode} />
        </>
      )}
    </div>
  );
};

export default LocalColeta;
