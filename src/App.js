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
  let cells;
  let mines;
  if (level === 'easy'){
    cells = 80;
    mines = randomMines(10, 1, cells);
  } else if (level === 'medium'){
    cells = 252;
    mines = randomMines(40, 1, cells);
  } else {
    cells = 480;
    mines = randomMines(99, 1, cells);
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
        totalCells={cells}
      />
    </div>
  );
}

export default App;
