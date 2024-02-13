import { useState } from "react";
import { postNovaDoacao, patchDoacao } from "../../services/doacao";
import ListDoacao from "./ListDoacao";
import DoacaoForms from "./DoacaoForms";

const Doacao = () => {
  const [updated, setUpdated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState();

  const changeEditMode = () => setEditMode((prev) => !prev);
  const changeUpdated = () => setUpdated((prev) => !prev);

  const saveNewItem = (novoItem) => {
    postNovaDoacao(novoItem.pessoa.id, novoItem.localColeta.id, novoItem.data)
      .then(() => {
        console.log("Doação salva com sucesso!");
        changeUpdated();
      })
      .catch((error) => console.log(error.response));
  };

  const saveUpdatedItem = (editItem) => {
    patchDoacao(
      editItem.id,
      editItem.pessoa.id,
      editItem.localColeta.id,
      editItem.data
    )
      .then(() => {
        console.log("Doação atualizada com sucesso!");
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
        <DoacaoForms
          handleSubmit={handleEditSubmit}
          title={"Editando Doação"}
          editCard={editItem}
          handleCancelEdit={changeEditMode}
          mode="edit"
          update={true}
        />
      ) : (
        <>
          <DoacaoForms
            handleSubmit={handleSubmit}
            title={"Cadastro de Doação"}
          />
          <ListDoacao updated={updated} onEdit={handleEditMode} />
        </>
      )}
    </div>
  );
};

export default Doacao;
