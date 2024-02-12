import { useState, useEffect } from "react";
import TextInput from "../../../components/Input";

const TipoForms = ({
  handleSubmit,
  title,
  editCard = null,
  mode = "add",
  handleCancelEdit = null,
  update = false,
}) => {
  const [tipoSelect, setTipoSelect] = useState();
  const [tipo, setTipo] = useState({
    tipo: "",
    fator: "",
  });

  const clearFields = () => {
    setTipo({
      tipo: "",
      fator: tipoSelect,
    });
  };

  const handleInputChange = (value, key) => {
    setTipo((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const setFatorOnTipo = (fator) => {
    setTipo((prevState) => ({
      ...prevState,
      fator,
    }));
  };

  const handleSelectSubmit = (e) => {
    const selectedFator = e.target.value;
    setTipoSelect(selectedFator);
    setFatorOnTipo(selectedFator);
  };

  useEffect(() => {
    if (editCard != null) {
      setTipo(editCard);
      setTipoSelect(editCard.fator);
    } else {
      setFatorOnTipo("Positivo");
      setTipoSelect("Positivo");
    }
  }, [update]);

  return (
    <div>
      <div className="genericForms">
        <h1>{title}</h1>
        <form
          action="/"
          onSubmit={(e) => {
            handleSubmit(e, tipo);
            clearFields();
          }}
        >
          <div className="genericFormsInputs">
            <TextInput
              placeHolder={"Tipo"}
              required={true}
              value={tipo.tipo}
              onChange={(e) => handleInputChange(e.target.value, "tipo")}
            />
            <select
              name="select"
              id="select"
              value={tipoSelect}
              onChange={handleSelectSubmit}
            >
              <option value={"Positivo"}>Positivo</option>
              <option value={"Negativo"}>Negativo</option>
            </select>
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

export default TipoForms;
