import { useState, useEffect } from "react";
import TextInput from "../../../components/Input";
import { getCidades } from "../../../services/cidade";
import { getTiposSanguineos } from "../../../services/tipoSanguineo";

const PessoaForms = ({
  handleSubmit,
  title,
  editCard = null,
  mode = "add",
  handleCancelEdit = null,
  update = false,
}) => {
  const [tipoSanguineo, setTipoSanguineos] = useState();
  const [tipoSelected, setTipoSelected] = useState();
  const [cidades, setCidades] = useState();
  const [cidadeSelect, setCidadeSelect] = useState();
  const [pessoa, setPessoa] = useState({
    id: 0,
    nome: "",
    rua: "",
    numero: "",
    complemento: "",
    rg: "",
    cidade: { estado: {} },
    tipoSanguineo: {},
  });

  const clearFields = () => {
    setPessoa({
      nome: "",
      rua: "",
      numero: "",
      complemento: "",
      rg: "",
      cidade: cidadeSelect,
      tipoSanguineo: tipoSelected,
    });
  };

  const handleInputChange = (value, key) => {
    if (key === "numero") {
      setPessoa((prevData) => ({
        ...prevData,
        [key]: Number(value),
      }));
    } else {
      setPessoa((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    }
  };

  const setCityOnPessoa = (city) => {
    setPessoa((prevState) => ({
      ...prevState,
      cidade: city,
    }));
  };

  const setTipoSanguineoOnPessoa = (tipo) => {
    setPessoa((prevState) => ({
      ...prevState,
      tipoSanguineo: tipo,
    }));
  };

  const handleSelectCitySubmit = (e) => {
    const selectedCity = cidades.find((cidade) => cidade.id == e.target.value);
    setCidadeSelect(selectedCity);
    setCityOnPessoa(selectedCity);
  };

  const handleSelectTipoSangueSubmit = (e) => {
    const selectedTipo = tipoSanguineo.find(
      (tipo) => tipo.id == e.target.value
    );
    setTipoSelected(selectedTipo);
    setTipoSanguineoOnPessoa(selectedTipo);
  };

  useEffect(() => {
    getCidades()
      .then((response) => {
        setCidades(response);
        if (editCard != null) return;
        setCidadeSelect(response[0]);
        setCityOnPessoa(response[0]);
      })
      .catch((error) => console.log(error));

    getTiposSanguineos()
      .then((response) => {
        setTipoSanguineos(response);
        if (editCard != null) return;
        setTipoSelected(response[0]);
        setTipoSanguineoOnPessoa(response[0]);
      })
      .catch((error) => console.log(error));

    if (editCard != null) {
      setPessoa(editCard);
      setCidadeSelect(editCard.cidade);
      setTipoSelected(editCard.tipoSanguineo);
    }
  }, [update]);

  return (
    <div>
      <div className="genericForms">
        <h1>{title}</h1>
        <form
          action="/"
          onSubmit={(e) => {
            handleSubmit(e, pessoa);
            clearFields();
          }}
        >
          <div className="genericFormsInputs">
            <TextInput
              placeHolder={"Nome"}
              required={true}
              value={pessoa.nome}
              onChange={(e) => handleInputChange(e.target.value, "nome")}
            />
            <TextInput
              placeHolder={"RG"}
              required={true}
              value={pessoa.rg}
              onChange={(e) => handleInputChange(e.target.value, "rg")}
            />
            <TextInput
              placeHolder={"Rua"}
              required={true}
              value={pessoa.rua}
              onChange={(e) => handleInputChange(e.target.value, "rua")}
            />
            <TextInput
              placeHolder={"Número"}
              required={true}
              type="number"
              value={pessoa.numero}
              onChange={(e) => handleInputChange(e.target.value, "numero")}
            />
            <TextInput
              placeHolder={"Complemento"}
              value={pessoa.complemento}
              onChange={(e) => handleInputChange(e.target.value, "complemento")}
            />
            <select
              name="select_cities"
              id="select_cities"
              value={cidadeSelect?.id}
              onChange={handleSelectCitySubmit}
            >
              {cidades?.map((cidade, idx) => (
                <option key={idx} value={cidade.id}>
                  {cidade.nome}
                </option>
              ))}
            </select>
            <TextInput
              divClassname={"small"}
              placeHolder={"Estado"}
              readOnly={true}
              value={cidadeSelect ? cidadeSelect.estado.sigla : "Estado"}
            />
            <select
              name="select_tipos"
              id="select_tipos"
              value={tipoSanguineo?.id}
              onChange={handleSelectTipoSangueSubmit}
            >
              {tipoSanguineo?.map((tipo, idx) => (
                <option key={idx} value={tipo.id}>
                  {tipo.tipo + " " + tipo.fator}
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

export default PessoaForms;
