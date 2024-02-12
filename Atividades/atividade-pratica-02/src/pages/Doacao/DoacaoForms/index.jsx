import { useState, useEffect } from "react";
import TextInput from "../../../components/Input";
import { getCidades } from "../../../services/cidade";
import { getTiposSanguineos } from "../../../services/tipoSanguineo";
import { getPessoas } from "../../../services/pessoa";
import { getLocaisColeta } from "../../../services/localColeta";

const DoacaoForms = ({
  handleSubmit,
  title,
  editCard = null,
  mode = "add",
  handleCancelEdit = null,
  update = false,
}) => {
  const [dataDoacao, setDataDoacao] = useState();
  const [pessoas, setPessoas] = useState();
  const [pessoaSelected, setPessoaSelected] = useState();
  const [locais, setLocais] = useState();
  const [localSelected, setLocalSelected] = useState();
  const [doacao, setDoacao] = useState({
    id: 0,
    pessoa: {},
    localColeta: {},
    data: "",
  });

  const clearFields = () => {
    setDoacao({
      id: 0,
      pessoa: pessoaSelected,
      localColeta: localSelected,
      data: dataDoacao,
    });
  };

  const setPessoaOnDoacao = (pessoa) => {
    setDoacao((prevState) => ({
      ...prevState,
      pessoa: pessoa,
    }));
  };

  const setLocalOnDoacao = (local) => {
    setDoacao((prevState) => ({
      ...prevState,
      localColeta: local,
    }));
  };

  const hangleInputDate = (e) => {
    setDataDoacao(e.target.value + "T00:00:00");
    setDoacao((prevState) => ({
      ...prevState,
      data: e.target.value + "T00:00:00",
    }));
  };

  const handleSelectPessoaSubmit = (e) => {
    const selectedPessoa = pessoas.find(
      (pessoa) => pessoa.id == e.target.value
    );
    setPessoaSelected(selectedPessoa);
    setPessoaOnDoacao(selectedPessoa);
  };

  const handleSelectLocalSubmit = (e) => {
    const localSelected = locais.find((local) => local.id == e.target.value);
    setLocalSelected(localSelected);
    setLocalOnDoacao(localSelected);
  };

  useEffect(() => {
    getPessoas()
      .then((response) => {
        setPessoas(response);
        if (editCard != null) return;
        setPessoaSelected(response[0]);
        setPessoaOnDoacao(response[0]);
      })
      .catch((error) => console.log(error));

    getLocaisColeta()
      .then((response) => {
        setLocais(response);
        if (editCard != null) return;
        setLocalSelected(response[0]);
        setLocalOnDoacao(response[0]);
      })
      .catch((error) => console.log(error));

    if (editCard != null) {
      setDoacao(editCard);
      setPessoaSelected(editCard.pessoa);
      setLocalSelected(editCard.localColeta);
    }
  }, [update]);

  return (
    <div>
      <div className="genericForms">
        <h1>{title}</h1>
        <form
          action="/"
          onSubmit={(e) => {
            handleSubmit(e, doacao);
            clearFields();
          }}
        >
          <div className="genericFormsInputs">
            <TextInput type="date" onChange={hangleInputDate} required={true} />
            <select
              name="select_pessoas"
              id="select_pessoas"
              value={pessoaSelected?.id}
              onChange={handleSelectPessoaSubmit}
            >
              {pessoas?.map((pessoa, idx) => (
                <option key={idx} value={pessoa.id}>
                  {pessoa.nome + " | RG: " + pessoa.rg}
                </option>
              ))}
            </select>
            <select
              name="select_local"
              id="select_local"
              value={locais?.id}
              onChange={handleSelectLocalSubmit}
            >
              {locais?.map((local, idx) => (
                <option key={idx} value={local.id}>
                  {local.nome +
                    ", " +
                    local.cidade.nome +
                    ", " +
                    local.cidade.estado.sigla}
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

export default DoacaoForms;
