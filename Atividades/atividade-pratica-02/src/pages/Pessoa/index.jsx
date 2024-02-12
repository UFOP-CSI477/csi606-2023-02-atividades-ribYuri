import { useState } from "react";
import { patchPessoa, postNovaPessoa } from "../../services/pessoa";
import ListPessoa from "./ListPessoa";
import PessoaForms from "./PessoaForms";

const Pessoa = () => {
  const [updated, setUpdated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState();

  const changeEditMode = () => setEditMode((prev) => !prev);
  const changeUpdated = () => setUpdated((prev) => !prev);

  const saveNewItem = (novoItem) => {
    postNovaPessoa(
      novoItem.nome,
      novoItem.rua,
      novoItem.numero,
      novoItem.complemento,
      novoItem.rg,
      novoItem.cidade.id,
      novoItem.tipoSanguineo.id
    )
      .then(() => {
        console.log("Pessoa salva com sucesso!");
        changeUpdated();
      })
      .catch((error) => console.log(error.response));
  };

  const saveUpdatedItem = (editItem) => {
    patchPessoa(
      editItem.id,
      editItem.nome,
      editItem.rua,
      editItem.numero,
      editItem.complemento,
      editItem.rg,
      editItem.cidade.id,
      editItem.tipoSanguineo.id
    )
      .then(() => {
        console.log("Pessoa atualizada com sucesso!");
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
        <PessoaForms
          handleSubmit={handleEditSubmit}
          title={"Editando Pessoa"}
          editCard={editItem}
          handleCancelEdit={changeEditMode}
          mode="edit"
          update={true}
        />
      ) : (
        <>
          <PessoaForms
            handleSubmit={handleSubmit}
            title={"Cadastro de Pessoa"}
          />
          <ListPessoa updated={updated} onEdit={handleEditMode} />
        </>
      )}
    </div>
  );
};

export default Pessoa;
