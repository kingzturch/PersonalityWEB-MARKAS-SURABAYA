import PropTypes from 'prop-types';

const ResultCard = (props) => {
  return (
    <div className="result-card flex flex-col items-center max-w-2xl">
      <div className="image-container">
        <img src={props.imageResult} alt={props.quizResult} className="card-image" />
      </div>
      <div className="card-content">
        <h2 className="card-title font-semibold uppercase text-[#DA1E3D]">{props.quizResult}</h2>
        <p className="card-description text-sm py-2 text-gray-600 text-justify">
          {props.descriptionResult}
        </p>
      </div>
    </div>
  );
};

ResultCard.propTypes = {
  quizResult: PropTypes.string.isRequired,
  descriptionResult: PropTypes.string.isRequired,
  imageResult: PropTypes.string.isRequired
};

export default ResultCard;