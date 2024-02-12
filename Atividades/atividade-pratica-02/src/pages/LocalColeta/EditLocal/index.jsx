import TextInput from "../../../components/Input";
import { getCidades } from "../../../services/cidade";
import { useState, useEffect } from "react";

const EditLocal = (local) => {
  const [editLocal, setEditLocal] = useState();
  const [cidades, setCidades] = useState();
  const [cidadeSelect, setCidadeSelect] = useState();

  const handleInputLocalChange = (value, key) => {
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

  const handleSelectSubmit = (e) => {
    const selectedCity = cidades.find((cidade) => cidade.id == e.target.value);
    setCidadeSelect(selectedCity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveLocal();
    setUpdated(1);
  };

  useEffect(() => {
    getCidades()
      .then((response) => {
        setCidades(response);
        setCidadeSelect(local.cidade);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <form action="/" onSubmit={handleSubmit}>
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
          placeHolder={"Estado"}
          readOnly={true}
          value={cidadeSelect?.estado.sigla}
        />
        <button type="submit">salvar</button>
      </form>
    </div>
  );
};

export default EditLocal;
