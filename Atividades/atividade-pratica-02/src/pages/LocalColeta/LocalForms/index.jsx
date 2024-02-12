import { useState, useEffect } from "react";
import TextInput from "../../../components/Input";
import { getCidades } from "../../../services/cidade";

const LocalForms = ({
  handleSubmit,
  title,
  editLocal = null,
  mode = "add",
  handleCancelEdit = null,
  update = false,
}) => {
  const [cidades, setCidades] = useState();
  const [cidadeSelect, setCidadeSelect] = useState();
  const [local, setLocal] = useState({
    id: 0,
    nome: "",
    rua: "",
    numero: "",
    complemento: "",
    cidade: { estado: {} },
  });

  const clearFields = () => {
    setLocal({
      nome: "",
      rua: "",
      numero: "",
      complemento: "",
    });
  };

  const handleInputLocalChange = (value, key) => {
    if (key === "numero") {
      setLocal((prevData) => ({
        ...prevData,
        [key]: Number(value),
      }));
    } else {
      setLocal((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    }
  };

  const setCityOnLocal = (city) => {
    setLocal((prevState) => ({
      ...prevState,
      cidade: city,
    }));
  };

  const handleSelectSubmit = (e) => {
    const selectedCity = cidades.find((cidade) => cidade.id == e.target.value);
    setCidadeSelect(selectedCity);
    setCityOnLocal(selectedCity);
  };

  useEffect(() => {
    getCidades()
      .then((response) => {
        setCidades(response);
        setCidadeSelect(response[0]);
        setCityOnLocal(response[0]);
      })
      .catch((error) => console.log(error));

    if (editLocal != null) {
      setLocal(editLocal);
      setCidadeSelect(editLocal.cidade);
    }
  }, [update]);

  return (
    <div>
      <div className="localForms">
        <h1>{title}</h1>
        <form
          action="/"
          onSubmit={(e) => {
            handleSubmit(e, local);
            clearFields();
          }}
        >
          <div className="formsInputs">
            <TextInput
              placeHolder={"Nome"}
              value={local.nome}
              onChange={(e) => handleInputLocalChange(e.target.value, "nome")}
            />
            <TextInput
              placeHolder={"Rua"}
              value={local.rua}
              onChange={(e) => handleInputLocalChange(e.target.value, "rua")}
            />
            <TextInput
              placeHolder={"Número"}
              value={local.numero}
              onChange={(e) => handleInputLocalChange(e.target.value, "numero")}
            />
            <TextInput
              placeHolder={"Complemento"}
              value={local.complemento}
              onChange={(e) =>
                handleInputLocalChange(e.target.value, "complemento")
              }
            />
            <select
              name="select_cities"
              id="select_cities"
              value={cidadeSelect?.id}
              onChange={handleSelectSubmit}
            >
              {cidades?.map((cidade, idx) => (
                <option key={idx} value={cidade.id}>
                  {cidade.nome}
                </option>
              ))}
            </select>
            <TextInput
              className={"small"}
              placeHolder={"Estado"}
              readOnly={true}
              value={cidadeSelect ? cidadeSelect.estado.sigla : "Estado"}
            />
          </div>
          {mode == "edit" ? (
            <div className="Editbuttons">
              <button type="submit">salvar</button>
              <button
                onClick={() => {
                  clearFields();
                  handleCancelEdit();
                }}
              >
                cancelar
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

export default LocalForms;
