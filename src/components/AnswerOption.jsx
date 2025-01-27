import PropTypes from "prop-types";

const AnswerOption = (props) => {
  const optionLabels = ["A", "B", "C"];
  const index = props.answerOptions.findIndex(
    (option) => option.content === props.answerContent
  );
  const label = optionLabels[index];

  return (
    <label
      htmlFor={props.answerType}
      className="answerOption flex space-x-4 p-4 border rounded-md shadow-sm mb-3 hover:bg-[#DA1E3D] hover:text-white cursor-pointer"
    >
      <input
        type="radio"
        name="radioGroup"
        className="radioCustomButton hidden peer bg-white"
        checked={props.answerType === props.answer}
        id={props.answerType}
        value={props.answerType}
        disabled={props.answer}
        onChange={props.onAnswerSelected}
      />
      <span className="flex items-center justify-center font-semibold w-5 h-10 border-gray-300 text-black peer-hover:bg-[#DA1E3D] peer-hover:text-white peer-checked:bg-[#DA1E3D] peer-checked:text-white peer-checked:border-transparent">
        {label}
      </span>
      <span className="radioContent flex items-center justify-center font-semibold">
        {props.answerContent}
      </span>
    </label>
  );
};

AnswerOption.propTypes = {
  answerType: PropTypes.string.isRequired,
  answerContent: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  answerOptions: PropTypes.array.isRequired,
};
export default AnswerOption;
