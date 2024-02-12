const GenericCard = ({ campos }) => {
  return (
    <div className="genericCard">
      {campos?.map((campo, idx) => (
        <p key={idx} className="genericData">
          {campo}
        </p>
      ))}
    </div>
  );
};

export default GenericCard;
