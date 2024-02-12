import { useState } from "react";
import { postNovoEstado, patchEstado } from "../../services/estado";
import EstadoForms from "./EstadoForms";
import ListEstados from "./ListEstados";

const Estado = () => {
  const [updated, setUpdated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editCard, setEditCard] = useState();

  const changeEditMode = () => setEditMode((prev) => !prev);
  const changeUpdated = () => setUpdated((prev) => !prev);

  const saveNewItem = (newItem) => {
    postNovoEstado(newItem.nome, newItem.sigla)
      .then(() => {
        console.log("Estado salvo com sucesso!");
        changeUpdated();
      })
      .catch((error) => console.log(error.response));
  };

  const saveUpdatedItem = (editItem) => {
    patchEstado(editItem.id, editItem.nome, editItem.sigla)
      .then(() => {
        console.log("Estado atualizado com sucesso!");
        changeUpdated();
      })
      .catch((error) => console.log(error.response));
  };

  const handleEditMode = (editItem) => {
    setEditCard(editItem);
    changeEditMode();
  };

  const handleSubmit = (e, newItem) => {
    e.preventDefault();
    saveNewItem(newItem);
    changeUpdated();
  };

  const handleEditSubmit = (e, editItem) => {
    e.preventDefault();
    saveUpdatedItem(editItem);
    changeEditMode();
  };

  return (
    <div className="genericContainer">
      {editMode ? (
        <EstadoForms
          handleSubmit={handleEditSubmit}
          title={"Editando Estados"}
          editCard={editCard}
          handleCancelEdit={changeEditMode}
          mode="edit"
          update={true}
        />
      ) : (
        <>
          <EstadoForms
            handleSubmit={handleSubmit}
            title={"Cadastro de Estado"}
          />
          <ListEstados updated={updated} onEdit={handleEditMode} />
        </>
      )}
    </div>
  );
};

export default Estado;
