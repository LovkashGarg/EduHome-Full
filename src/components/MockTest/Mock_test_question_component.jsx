import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const McqQuestion = () => {
    const [questions, setQuestions] = useState([]);
    const questiontype=useParams();
    useEffect(() => {
        console.log(questiontype);
        // Fetch JSON data from the backend
        fetch(`http://localhost:5000/Generate/${questiontype.id}`) // Replace with your backend URL
          .then(response => response.json())
          .then(data => setQuestions(data.data))
          .catch(error => console.error('Error fetching data:', error));
      },[questiontype]);
    
 
   
   
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer('');
  };

  return (
    <div className="container mx-auto p-4 mt-[3%] w-[70vw] h-[50vh]">
      <h2 className="text-[40px]  font-bold mb-4  text-center ">MCQ Questions</h2>
      {currentQuestion < questions.length ? (
        <div className='flex flex-col   text-[30px]'>
          <p className=" text-[30px] font-bold mb-2">{questions[currentQuestion].question}</p>
          <ul >
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index} >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={handleAnswerChange}
                />
                <span className="ml-2">{option}</span>
              </li>
            ))}
          </ul>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <p className="text-[40px] font-bold text-green-400 mb-2">Your score is {score} out of {questions.length}</p>
          <button
            className="bg-blue-500 text-[40px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setCurrentQuestion(0)}
          >
            Start Again
          </button>
        </div>
      )}
    </div>
  );
};

export default McqQuestion;