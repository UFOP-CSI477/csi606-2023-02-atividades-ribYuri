import "./Title.css";

export const Title = (props) => {
  return (
    <div className={props.className}>
      <h1 className="title">{props.title}</h1>
      <p className="title_description">{props.description}</p>
    </div>
  );
};
