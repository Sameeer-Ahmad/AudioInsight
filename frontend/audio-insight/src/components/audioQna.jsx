// AudioQna.js
import  { useState, useEffect } from 'react';
import useSocket from '../hooks/useSocket';

const AudioQna = () => {
  const socket = useSocket();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [qaHistory, setQaHistory] = useState([]);

  const askQuestion = () => {
    if (socket) {
      socket.emit('askQuestion', { question });

      socket.on('answer', (data) => {
        setAnswer(`Q: ${question}\nA: ${data.answer}`);
        setQaHistory([ { question, answer: data.answer },...qaHistory]);
        setQuestion('');
      });
      socket.on('error', (message) => {
        console.error('Error:', message);
      });
    }
    
  };
  
  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (data) => {
        console.log('Message received:', data);
      });
    }
  }, [socket]);

  return (
    <div>
      <div>
        <label htmlFor="question">Question: </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <button onClick={askQuestion}>Ask Question</button>
      <div>
        {qaHistory.map((qa, index) => (
          <div key={index}>
            <p>Qus: {qa.question}</p>
            <p>Ans: {qa.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioQna;
