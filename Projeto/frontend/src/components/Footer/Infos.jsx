export const Infos = (props) => {
  return (
    <div className="info_component">
      <h3>{props.title}</h3>
      <p>{props.text1}</p>
      <p>{props.text2}</p>
      <p>{props.text3}</p>
    </div>
  );
};
