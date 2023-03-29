import './App.css';
import Header from './components/Header.jsx';
import Board from './components/Board.jsx';
import { useState } from 'react';


function App() {

  const [level, setLevel] = useState('easy');
  
  function handleDifficulty(e){
    const {value} = e.target;
    if (level !== value){
      setLevel(value);
    }
  }

  return (
    <div id="main">
      <Header
        difficulty={handleDifficulty}
      />
      <Board
        level={level}
      />
    </div>
  );
}

export default App;
