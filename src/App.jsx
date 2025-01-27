import { useState, useEffect } from "react";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from "./API/MarkmateAPI";
import gsap from "gsap";
import Preloader from "./components/loading/preloader";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import QuestionAPI from "./API/QuestionAPI";
import DescriptionAPI from "./API/DescriptionAPI";
import LoginForm from "./components/LoginForm";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [setUserData] = useState({});
  const [counter, setCounter] = useState(0);
  const [questionId, setQuestionId] = useState(1);
  const [question, setQuestion] = useState("");
  const [answerOptions, setAnswerOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [points, setPoints] = useState({ Hacker: 0, Hipster: 0, Hustler: 0 });
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (userEmail) {
        const q = query(collection(db, "users"), where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setUserData(querySnapshot.docs[0].data());
        }
      }
    };

    fetchUserData();
  }, [userEmail, setUserData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.to(".preloader", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => setIsLoading(false),
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setQuestion(QuestionAPI[0].question);

    const shuffledAnswersOption = QuestionAPI.map((question) =>
      shuffleArray(question.answers)
    );

    setAnswerOptions(shuffledAnswersOption[0]);
  }, []);

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  const handleAnswerSelected = (event) => {
    const answer = event.currentTarget.value;
    setUserAnswer(answer);

    if (questionId < QuestionAPI.length) {
      setTimeout(() => setNextQuestion(), 300);
    } else {
      setTimeout(() => setResults(), 300);
    }
  };

  const setUserAnswer = (answerType) => {
    const updatedPoints = { ...points };
    updatedPoints[answerType] += 1;

    setPoints(updatedPoints);
    setAnswer(answerType);
  };

  const setNextQuestion = () => {
    const newCounter = counter + 1;
    const newQuestionId = questionId + 1;

    setCounter(newCounter);
    setQuestionId(newQuestionId);
    setQuestion(QuestionAPI[newCounter].question);
    setAnswerOptions(QuestionAPI[newCounter].answers);
    setAnswer("");
  };

  const setResults = () => {
    const maxPoints = Math.max(points.Hacker, points.Hipster, points.Hustler);
    const resultTypes = [];

    if (points.Hacker === maxPoints) {
      resultTypes.push("Hacker");
    }
    if (points.Hipster === maxPoints) {
      resultTypes.push("Hipster");
    }
    if (points.Hustler === maxPoints) {
      resultTypes.push("Hustler");
    }

    const finalResult =
      resultTypes[Math.floor(Math.random() * resultTypes.length)];
    setResult(finalResult);
  };

  const updateRole = async (role) => {
    if (userEmail) {
      const q = query(collection(db, "users"), where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(db, "users", userDoc.id);
        await updateDoc(userRef, { role });
        setUserData((prevData) => ({ ...prevData, role }));
      }
    }
  };

  useEffect(() => {
    if (result) {
      const role = result.toLowerCase();
      updateRole(role);
    }
  }, [result]);

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleRetakeQuiz = () => {
    setResult('');
    setQuestionId(1);
    setCounter(0);
    setAnswer('');
    setPoints({ Hacker: 0, Hipster: 0, Hustler: 0 });
    const shuffledQuestions = QuestionAPI.map((question) => ({
      ...question,
      answers: shuffleArray(question.answers),
    }));
    setQuestion(QuestionAPI[0].question);
    setAnswerOptions(shuffledQuestions[0].answers);
  };

  return (
    <div className="App">
      {isLoading ? (
        <Preloader className="preloader" />
      ) : !isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) :  result ? (
        <Result
          userEmail={userEmail}
          quizResult={result}
          imageResult={DescriptionAPI[result]?.image || 'Image not found'}
          descriptionResult={DescriptionAPI[result]?.description || 'Description not found'}
          onRetakeQuiz={handleRetakeQuiz}
        />
      ) : (
        <div className="bgpage bg-[#DA1E3D] min-h-screen flex items-center justify-center relative">
          <img
            className="background-image z-0 absolute w-full h-full object-cover"
            src="./assets/bg-question.png"
            alt="img-bg"
          />
          <div className="gradient-mask z-10 absolute inset-0"></div>
          <Quiz
            answer={answer}
            answerOptions={answerOptions}
            questionId={questionId}
            question={question}
            questionTotal={QuestionAPI.length}
            onAnswerSelected={handleAnswerSelected}
          />
        </div>
      )}
    </div>
  );
}

export default App;
