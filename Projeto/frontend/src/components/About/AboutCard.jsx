import "./AboutCard.css";

export const AboutCard = ({ className, icon, title, description }) => {
  return (
    <div className={className}>
      <div className="aboutCard_icon">{icon}</div>
      <h2 className="aboutCard_title">{title}</h2>
      <p className="aboutCard_description">{description}</p>
    </div>
  );
};
