import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [fillAnswer, setFillAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const [fillFeedback, setFillFeedback] = useState('');

  const questions = [
    {
      type: 'single',
      questionText: 'Who was the author of the Mahabharata?',
      options: ['Vyasa', 'Valmiki', 'Tulsidas', 'Kalidasa'],
      correctAnswer: 'Vyasa',
      answer: 'Vyasa is traditionally credited as the author of the Mahabharata.',
    },
    {
      type: 'single',
      questionText: 'Who was the teacher of Arjuna in the Mahabharata?',
      options: ['Krishna', 'Bhishma', 'Drona', 'Vyasa'],
      correctAnswer: 'Drona',
      answer: 'Drona was the teacher of Arjuna.',
    },
    {
      type: 'fill',
      questionText: 'Fill in the blank: The Mahabharata war was fought at __________.',
      correctAnswer: 'Kurukshetra',
      answer: 'The Mahabharata war was fought at Kurukshetra.',
    },
    {
      type: 'single',
      questionText: 'What is the name of the Pandavas mother?',
      options: ['Ambika', 'Madri', 'Draupadi', 'Kunti'],
      correctAnswer: 'Kunti',
      answer: 'Kunti was the mother of Pandavas.',
    },
    {
      type: 'single',
      questionText: 'Which character is known for his vow to never marry?',
      options: ['Arjuna', 'Bhishma', 'Krishna', 'Yudhishthira'],
      correctAnswer: 'Bhishma',
      answer: 'Bhishma was the character known for his vow to remain unmarried.',
    },
    {
      type: 'fill',
      questionText: 'Fill in the blank: The Bhagavad Gita was recited to Arjuna by __________ on the battlefield.',
      correctAnswer: 'Krishna',
      answer: 'Krishna recited the Bhagavad Gita to Arjuna on the battlefield.',
    },
    {
      type: 'single',
      questionText: 'Who answered all the questions of Yaksha?',
      options: ['Nakula', 'Bheeshma', 'Yudishtira', 'Arjuna'],
      correctAnswer: 'Yudishtira',
      answer: 'Yudhishthira correctly answered all the Yaksha questions.',
    },
    {
      type: 'single',
      questionText: 'Who is known as the "father of the Kauravas"?',
      options: ['Dhritarashtra', 'Pandu', 'Yudhishthira', 'Bhishma'],
      correctAnswer: 'Dhritarashtra',
      answer: 'Dhritarashtra was the father of the Kauravas.',
    },
    {
      type: 'fill',
      questionText: 'Fill in the blank: The Mahabharata war lasted for __________ days.',
      correctAnswer: '18',
      answer: 'The Mahabharata war lasted for 18 days.',
    },
    {
      type: 'single',
      questionText: 'Who was Abhimanyus wife?',
      options: ['Devika', 'Subhadra', 'Draupadi', 'Uttara'],
      correctAnswer: 'Uttara',
      answer: 'Uttara was the wife of Abhimanyu.',
    },
  ];

  useEffect(() => {
    if (quizStarted && timerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowAnswer(true);
      setTimerActive(false);
    }
  }, [quizStarted, timeLeft, timerActive]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(10);
    setTimerActive(true);
    setFillFeedback('');
  };

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    setTimerActive(false);
    if (questions[currentQuestion].correctAnswer === option) {
      setScore(score + 1);
    } else {
      setShowAnswer(true);
    }
  };

  const handleFillAnswer = () => {
    setTimerActive(false);
    const isCorrect = fillAnswer.trim().toLowerCase() === 
      questions[currentQuestion].correctAnswer.toLowerCase();
    
    if (isCorrect) {
      setScore(score + 1);
      setFillFeedback('Correct!');
    } else {
      setFillFeedback('Wrong!');
      setShowAnswer(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setFillAnswer('');
      setFillFeedback('');
      setTimeLeft(10);
      setTimerActive(true);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setFillAnswer('');
      setFillFeedback('');
      setTimeLeft(10);
      setTimerActive(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setFillAnswer('');
    setScore(0);
    setTimeLeft(10);
    setTimerActive(true);
    setFillFeedback('');
  };

  const isAnswerCorrect = (option) => {
    return option === questions[currentQuestion].correctAnswer;
  };

  return (
    <div className="quiz-container">
      {!quizStarted && !quizCompleted ? (
        <div className="start-screen">
          <h1>Mahabharata Quiz</h1>
          <p>The Mahabharata, India's greatest epic, narrates the Pandavas-Kauravas war where Lord Krishna revealed the Bhagavad Gita's wisdom. The 18-day Kurukshetra battle featured legendary warriors like Arjuna and Bhishma, teaching eternal truths about duty and righteousness.</p>
          <p>Test your knowledge about the epic Mahabharata. This quiz includes {questions.length} questions.</p>
          <button onClick={handleStartQuiz} className="start-button">
            Start Quiz
          </button>
        </div>
      ) : quizCompleted ? (
        <div className="score-screen">
          <h2>Quiz Completed!</h2>
          <p>Your final score: {score} out of {questions.length}</p>
          <button onClick={handleRestartQuiz} className="restart-button">
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className="quiz-screen">
          <div className="question-section">
            <h2>Question {currentQuestion + 1} of {questions.length}</h2>
            <p>{questions[currentQuestion].questionText}</p>
          </div>

          <div className="timer">
            <p>Time Left: {timeLeft} seconds</p>
          </div>

          {questions[currentQuestion].type === 'fill' ? (
            <div className="fill-section">
              <input
                type="text"
                placeholder="Type your answer here"
                value={fillAnswer}
                onChange={(e) => setFillAnswer(e.target.value)}
                disabled={showAnswer || selectedAnswer !== null}
              />
              <button 
                onClick={handleFillAnswer} 
                disabled={showAnswer || selectedAnswer !== null || !fillAnswer.trim()}
              >
                Submit
              </button>
              {fillFeedback && (
                <p className={`feedback-text ${fillFeedback === 'Correct!' ? 'correct' : 'wrong'}`}>
                  {fillFeedback}
                </p>
              )}
            </div>
          ) : (
            <div className="options-section">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  disabled={selectedAnswer !== null || timeLeft === 0}
                >
                  {option}
                  {selectedAnswer === option && (
                    <span className="feedback-icon">
                      {isAnswerCorrect(option) ? '✔️' : '❌'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {(showAnswer || timeLeft === 0) && (
            <div className="solution-section">
              <p><strong>Answer:</strong> {questions[currentQuestion].answer}</p>
            </div>
          )}

          <div className="navigation-section">
            <button 
              onClick={handlePreviousQuestion} 
              disabled={currentQuestion === 0}
            >
              Back
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={
                (questions[currentQuestion].type === 'single' && selectedAnswer === null && !showAnswer) ||
                (questions[currentQuestion].type === 'fill' && !fillFeedback && timeLeft > 0)
              }
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;