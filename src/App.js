import './App.css';
import Header from './components/Header.jsx';
import Board from './components/Board.jsx';
import { useEffect, useState } from 'react';


function App() {
  const [level, setLevel] = useState('easy');
  const [status, setStatus] = useState('game');

  useEffect(() =>{
    setStatus('game');
  },[level]);

  let cells;
  let mines = [];
  let halt;

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

  
  function changeStatus(string){
    if (string === 'win'){
      setStatus('win');
    } else if (string === 'lose'){
      setStatus('lose')
    } else {
      setStatus('game');
    }
    halt = true;
  }

  
  return (
    <div id="main">
      <Header
        difficulty={handleDifficulty}
        level={level}
        status={status}
      />
      <Board
        level={level}
        mines={mines}
        totalCells={cells}
        onStatus={changeStatus}
        halt={halt}
      />
    </div>
  );
}

export default App;
