import "./styles.scss";

const CardLocal = ({
  nome,
  rua,
  numero,
  complemento,
  cidade,
  estado,
  sigla,
}) => {
  return (
    <div className="genericCard">
      <p className="genericData">{nome}</p>
      <p className="genericData">{rua}</p>
      <p className="genericData">{numero}</p>
      <p className="genericData">{complemento}</p>
      <p className="genericData">{cidade}</p>
      <p className="genericData">{estado}</p>
      <p className="genericData">{sigla}</p>
    </div>
  );
};

export default CardLocal;
