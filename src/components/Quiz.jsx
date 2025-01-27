import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import PropTypes from "prop-types";
import AnswerOption from "./AnswerOption";
import Question from "./Question";
import QuestionCount from "./QuestionCount";
import { Progress } from "@material-tailwind/react";

function Quiz(props) {
  const questionRef = useRef(null);
  const answerOptionRef = useRef([]);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    gsap.fromTo(
      questionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );

    gsap.fromTo(
      answerOptionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    );
  }, [props.question]);

  useEffect(() => {
    const newProgressValue = (props.questionId / props.questionTotal) * 100;
    gsap.to(
      { value: progressValue },
      {
        value: newProgressValue,
        duration: 1,
        ease: "power2.out",
        onUpdate: function () {
          setProgressValue(this.targets()[0].value);
        },
      });
  }, [props.questionId, props.questionTotal, progressValue]);

  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
        answerOptions={props.answerOptions}
        ref={(element) => answerOptionRef.current.push(element)}
      />
    );
  }

  return (
    <div className="quiz w-9/12 flex flex-col justify-center items-center z-20 md:">
      <QuestionCount counter={props.questionId} total={props.questionTotal} />
      <div className="bg-gray-50 flex flex-col w-full rounded-xl px-8 py-4">
        <div className="questionRef" ref={questionRef}>
          <Question content={props.question} />
          <ul className="answerOption">
            {props.answerOptions.map(renderAnswerOptions)}
          </ul>
        </div>
        <Progress
          className="custom-progress"
          color="red"
          value={progressValue}
        />
      </div>
    </div>
  );
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  questionId: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
};

export default Quiz;