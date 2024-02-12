import { useState } from "react";
import {
  postNovoTipoSanguineo,
  patchTipoSanguineo,
} from "../../services/tipoSanguineo";
import ListTipos from "./ListTipos";
import TipoForms from "./TipoForms";

const TipoSanguineo = () => {
  const [updated, setUpdated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editCard, setEditCard] = useState();

  const saveNewItem = (newItem) => {
    postNovoTipoSanguineo(newItem.tipo, newItem.fator)
      .then(() => {
        console.log("Tipo salvo com sucesso!");
        setUpdated((prev) => !prev);
      })
      .catch((error) => console.log(error));
  };

  const saveUpdatedItem = (editItem) => {
    patchTipoSanguineo(editItem.id, editItem.tipo, editItem.fator)
      .then(() => {
        console.log("Tipo atualizado com sucesso!");
        setUpdated((prev) => !prev);
      })
      .catch((error) => console.log(error));
  };

  const changeEditMode = () => setEditMode((prev) => !prev);

  const handleEditMode = (editItem) => {
    setEditCard(editItem);
    changeEditMode((prev) => !prev);
  };

  const handleSubmit = (e, newItem) => {
    e.preventDefault();
    saveNewItem(newItem);
    setUpdated((prev) => !prev);
  };

  const handleEditSubmit = (e, editItem) => {
    e.preventDefault();
    saveUpdatedItem(editItem);
    setEditMode((prev) => !prev);
  };

  return (
    <div className="genericContainer">
      {editMode ? (
        <TipoForms
          handleSubmit={handleEditSubmit}
          title={"Editando Tipo Sanguineo"}
          editCard={editCard}
          selectedOption={editCard.fator}
          handleCancelEdit={changeEditMode}
          mode="edit"
          update={true}
        />
      ) : (
        <>
          <TipoForms
            handleSubmit={handleSubmit}
            title={"Cadastro de Tipo Sanguineo"}
          />
          <ListTipos updated={updated} onEdit={handleEditMode} />
        </>
      )}
    </div>
  );
};

export default TipoSanguineo;
