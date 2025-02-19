import PropTypes from "prop-types"

const Question = (props) => {
  return (
    <h2 className="question mb-5 mt-2 self-center font-semibold text-2xl">{props.content}</h2>
  )
}

Question.propTypes = {
    content: PropTypes.string.isRequired
}

export default Question