import { useState, useEffect } from "react";
import TextInput from "../../../components/Input";
import { getEstados } from "../../../services/estado";

const CidadeForms = ({
  handleSubmit,
  title,
  editCard = null,
  mode = "add",
  handleCancelEdit = null,
  update = false,
}) => {
  const [estados, setEstados] = useState();
  const [estadoSelected, setEstadoSelected] = useState();
  const [cidade, setCidade] = useState({
    id: 0,
    nome: "",
    estado: {},
  });

  const clearFields = () => {
    setCidade({
      id: 0,
      nome: "",
      estado: estadoSelected,
    });
  };

  const handleInputChange = (value, key) => {
    setCidade((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const setEstadoOnCidade = (estado) => {
    setCidade((prevState) => ({
      ...prevState,
      estado,
    }));
  };

  const handleSelectEstadoSubmit = (e) => {
    const selectedEstado = estados.find(
      (estado) => estado.id == e.target.value
    );
    setEstadoSelected(selectedEstado);
    setEstadoOnCidade(selectedEstado);
  };

  useEffect(() => {
    getEstados()
      .then((response) => {
        setEstados(response);
        if (editCard != null) return;
        setEstadoSelected(response[0]);
        setEstadoOnCidade(response[0]);
      })
      .catch((error) => console.log(error));

    if (editCard != null) {
      setCidade(editCard);
      setEstadoSelected(editCard.estado);
    }
  }, [update]);

  return (
    <div>
      <div className="genericForms">
        <h1>{title}</h1>
        <form
          action="/"
          onSubmit={(e) => {
            handleSubmit(e, cidade);
            clearFields();
          }}
        >
          <div className="genericFormsInputs">
            <TextInput
              placeHolder={"Nome"}
              required={true}
              value={cidade.nome}
              onChange={(e) => handleInputChange(e.target.value, "nome")}
            />
            <select
              name="select_estados"
              id="select_estados"
              value={estadoSelected?.id}
              onChange={handleSelectEstadoSubmit}
            >
              {estados?.map((estado, idx) => (
                <option key={idx} value={estado.id}>
                  {estado.nome}
                </option>
              ))}
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

export default CidadeForms;
