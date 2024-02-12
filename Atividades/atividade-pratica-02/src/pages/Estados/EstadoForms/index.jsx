import { useState, useEffect } from "react";
import TextInput from "../../../components/Input";

const EstadoForms = ({
  handleSubmit,
  title,
  editCard = null,
  mode = "add",
  handleCancelEdit = null,
  update = false,
}) => {
  const [estado, setEstado] = useState({
    nome: "",
    sigla: "",
  });

  const clearFields = () => {
    setEstado({
      nome: "",
      sigla: "",
    });
  };

  const handleInputChange = (value, key) => {
    setEstado((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (editCard != null) {
      setEstado(editCard);
    }
  }, [update]);

  return (
    <div>
      <div className="genericForms">
        <h1>{title}</h1>
        <form
          action="/"
          onSubmit={(e) => {
            handleSubmit(e, estado);
            clearFields();
          }}
        >
          <div className="genericFormsInputs">
            <TextInput
              placeHolder={"Nome"}
              required={true}
              value={estado.nome}
              onChange={(e) => handleInputChange(e.target.value, "nome")}
            />
            <TextInput
              placeHolder={"Sigla"}
              required={true}
              value={estado.sigla}
              onChange={(e) => handleInputChange(e.target.value, "sigla")}
            />
          </div>
          {mode == "edit" ? (
            <div className="editButtons">
              <button className="saveButton" type="submit">
                Salvar
              </button>
              <button
                className="cancelButton"
                onClick={() => {
                  clearFields();
                  handleCancelEdit();
                }}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button className="addButton" type="submit">
              Cadastrar
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EstadoForms;
