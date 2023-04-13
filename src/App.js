import './App.css';
import Header from './components/Header.jsx';
import Board from './components/Board.jsx';
import { useEffect, useState, useMemo, memo} from 'react';


function App() {
  const [status, setStatus] = useState('game');
  const [level, setLevel] = useState('easy');
  const [numFlags, setNumFlags] = useState(10);

  useEffect(() =>{
    setStatus('game');
    setNumFlags(() => {
      if (level === 'easy'){
        return 10;
      } else if (level === 'medium'){
        return 40;
      } else{
        return 99;
      }
    });
  },[level]);
 
  useEffect(()=>console.log('App re-rendered.'));

  let cells;
  let numOfMines;

  if (level === 'easy'){
    cells = 80;
    numOfMines = 10;
  } else if (level === 'medium'){
    cells = 252;
    numOfMines = 40;
  } else {
    cells = 480;
    numOfMines = 99;
  } 

  const mines = useMemo(() => randomMines(numOfMines, 1, cells), [cells, numOfMines]);

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
      setStatus('lose');
    } else {
      setStatus('game');
    }
  }

  function flagsCount(plusOrMinus){
    if (plusOrMinus === '+'){
      setNumFlags(numFlags+1);
    } else {
      setNumFlags(numFlags-1);
    }
    
  }
  
  return (
    <div id="main">
      <Header
        difficulty={handleDifficulty}
        level={level}
        status={status}
        flags={numFlags}
      />
      <Board
        level={level}
        mines={mines}
        totalCells={cells}
        onStatus={changeStatus}
        onFlags={flagsCount}
      />
    </div>
  );
}

export default memo(App);
