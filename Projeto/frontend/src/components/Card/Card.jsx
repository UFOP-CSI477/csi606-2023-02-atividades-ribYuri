import "./Card.css";

export const Card = ({
  imageUrl,
  imageAlt,
  className,
  imageClass,
  titleClass,
  title,
  description,
}) => {
  const cardClassName = className ? `normal_size ${className}` : `normal_size`;
  const titleClassName = titleClass ? `card_title ${titleClass}` : "card_title";

  return (
    <div className={cardClassName}>
      <img
        src={imageUrl}
        alt={imageAlt}
        className={`card_image ${imageClass}`}
      />
      <label className={titleClassName}>{title}</label>
      <label className="card_description">{description}</label>
    </div>
  );
};
