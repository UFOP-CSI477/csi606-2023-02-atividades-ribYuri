import { useState } from "react";
import { postNovaCidade, patchCidade } from "../../services/cidade";
import CidadeForms from "./CidadeForms";
import ListCidade from "./ListCidade";

const Cidade = () => {
  const [updated, setUpdated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState();

  const changeEditMode = () => setEditMode((prev) => !prev);
  const changeUpdated = () => setUpdated((prev) => !prev);

  const saveNewItem = (novoItem) => {
    postNovaCidade(novoItem.nome, novoItem.estado.id)
      .then(() => {
        console.log("Cidade salva com sucesso!");
        changeUpdated();
      })
      .catch((error) => console.log(error.response));
  };

  const saveUpdatedItem = (editItem) => {
    patchCidade(editItem.id, editItem.nome, editItem.estado.id)
      .then(() => {
        console.log("Cidade atualizada com sucesso!");
        changeUpdated();
      })
      .catch((error) => console.log(error.response));
  };

  const handleEditMode = (item) => {
    setEditItem(item);
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
        <CidadeForms
          handleSubmit={handleEditSubmit}
          title={"Editando Cidade"}
          editCard={editItem}
          handleCancelEdit={changeEditMode}
          mode="edit"
          update={true}
        />
      ) : (
        <>
          <CidadeForms
            handleSubmit={handleSubmit}
            title={"Cadastro de Cidade"}
          />
          <ListCidade updated={updated} onEdit={handleEditMode} />
        </>
      )}
    </div>
  );
};

export default Cidade;
