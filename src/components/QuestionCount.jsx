import PropTypes from "prop-types"

const QuestionCount = (props) => {
  return (
    <div className="questionCount self-start mb-6 text-4xl font-semibold text-white">
        Pertanyaan <span>{props.counter}</span>
    </div>
  );
}

QuestionCount.propTypes = {
    counter: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired, 
};

export default QuestionCount