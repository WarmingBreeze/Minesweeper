import './App.css';
import Header from './components/Header.jsx';
import Board from './components/Board.jsx';
import { useState } from 'react';


function App() {

  const [level, setLevel] = useState('easy');

  //generate random numbers to decide which cells hold mines
  function randomMines(n, min, max){
    const randomNums = [];
    let i = 0;
    while (i < n){
      const randomNum = Math.floor(Math.random()*(max - min + 1)) + min;
      if (!(randomNums.includes(randomNum))){
        randomNums.push(randomNum);
        i++;
      }
    }
    return randomNums;
  }

  let mines;
  if (level === 'easy'){
    mines = randomMines(10, 1, 80);
  } else if (level === 'medium'){
    mines = randomMines(40, 1, 252);
  } else {
    mines = randomMines(99, 1, 480);
  } 


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
        level={level}
      />
      <Board
        level={level}
        mines={mines}
      />
    </div>
  );
}

export default App;
