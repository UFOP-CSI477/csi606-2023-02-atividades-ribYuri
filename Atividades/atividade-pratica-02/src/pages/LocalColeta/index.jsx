import "./styles.scss";
import TextInput from "../../components/Input";
import { useState, useEffect } from "react";
import { patchNovoLocal, postNovoLocal } from "../../services/localColeta";
import { getCidades } from "../../services/cidade";
import ListLocal from "./ListLocal";

const LocalColeta = () => {
  const [updated, setUpdated] = useState(false);
  const [cidades, setCidades] = useState();
  const [editMode, setEditMode] = useState(false);
  const [editLocal, setEditLocal] = useState();
  const [cidadeSelect, setCidadeSelect] = useState();
  const [novoLocal, setNovoLocal] = useState({
    id: 0,
    nome: "",
    rua: "",
    numero: "",
    complemento: "",
    cidade: { estado: {} },
  });

  const clearFields = () => {
    setEditLocal({
      nome: "",
      rua: "",
      numero: "",
      complemento: "",
    });
    setNovoLocal({
      nome: "",
      rua: "",
      numero: "",
      complemento: "",
    });
  };

  const handleInputLocalChange = (value, key) => {
    if (key === "numero") {
      setNovoLocal((prevData) => ({
        ...prevData,
        [key]: Number(value),
      }));
    } else {
      setNovoLocal((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    }
  };

  const handleEditLocalChange = (value, key) => {
    if (key === "numero") {
      setEditLocal((prevData) => ({
        ...prevData,
        [key]: Number(value),
      }));
    } else {
      setEditLocal((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    }
  };

  const saveLocal = () => {
    postNovoLocal(
      novoLocal.nome,
      novoLocal.rua,
      novoLocal.numero,
      novoLocal.complemento,
      cidadeSelect.id
    )
      .then(() => {
        console.log("Local salvo com sucesso!");
        setUpdated((prev) => !prev);
      })
      .catch((error) => console.log(error));
  };

  const saveUpdatedLocal = () => {
    patchNovoLocal(
      editLocal.id,
      editLocal.nome,
      editLocal.rua,
      editLocal.numero,
      editLocal.complemento,
      cidadeSelect.id
    )
      .then(() => {
        console.log("Local atualizado com sucesso!");
        setUpdated((prev) => !prev);
      })
      .catch((error) => console.log(error));
  };

  const handleSelectSubmit = (e) => {
    const selectedCity = cidades.find((cidade) => cidade.id == e.target.value);
    setCidadeSelect(selectedCity);
  };

  const handleEditMode = (local) => {
    setEditLocal(local);
    setCidadeSelect(local.cidade);
    setEditMode((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveLocal();
    setUpdated((prev) => !prev);
    clearFields();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    saveUpdatedLocal();
    setEditMode((prev) => !prev);
  };

  useEffect(() => {
    getCidades()
      .then((response) => {
        setCidades(response);
        setCidadeSelect(response[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {editMode ? (
        <div className="localContainer">
          <h1>Editando Local de Coleta</h1>
          <form action="/" onSubmit={handleEditSubmit}>
            <TextInput
              placeHolder={"Nome"}
              value={editLocal.nome}
              onChange={(e) => handleEditLocalChange(e.target.value, "nome")}
            />
            <TextInput
              placeHolder={"Rua"}
              value={editLocal.rua}
              onChange={(e) => handleEditLocalChange(e.target.value, "rua")}
            />
            <TextInput
              placeHolder={"Número"}
              value={editLocal.numero}
              onChange={(e) => handleEditLocalChange(e.target.value, "numero")}
            />
            <TextInput
              placeHolder={"Complemento"}
              value={editLocal.complemento}
              onChange={(e) =>
                handleEditLocalChange(e.target.value, "complemento")
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
              placeHolder={"Estado"}
              readOnly={true}
              value={cidadeSelect ? cidadeSelect.estado.sigla : "Estado"}
            />
            <button type="submit">salvar</button>
            <button
              onClick={() => {
                setEditMode((prev) => !prev);
                clearFields();
              }}
            >
              cancelar
            </button>
          </form>
        </div>
      ) : (
        <div className="localContainer">
          <h1>Cadastra local de coleta</h1>
          <form action="/" onSubmit={handleSubmit}>
            <TextInput
              placeHolder={"Nome"}
              value={novoLocal.nome}
              onChange={(e) => handleInputLocalChange(e.target.value, "nome")}
            />
            <TextInput
              placeHolder={"Rua"}
              value={novoLocal.rua}
              onChange={(e) => handleInputLocalChange(e.target.value, "rua")}
            />
            <TextInput
              placeHolder={"Número"}
              value={novoLocal.numero}
              onChange={(e) => handleInputLocalChange(e.target.value, "numero")}
            />
            <TextInput
              placeHolder={"Complemento"}
              value={novoLocal.complemento}
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
              placeHolder={"Estado"}
              readOnly={true}
              value={cidadeSelect ? cidadeSelect.estado.sigla : "Estado"}
            />
            <button type="submit">submit</button>
          </form>

          <ListLocal updated={updated} onEdit={handleEditMode} />
        </div>
      )}
    </div>
  );
};

export default LocalColeta;
