import Cell from './Cell.jsx';
import './Board.css';
import { useState } from 'react';
import one from '../images/numbers/number-1.png';
import two from '../images/numbers/number-2.png';
import three from '../images/numbers/number-3.png';
import four from '../images/numbers/number-4.png';
import five from '../images/numbers/number-5.png';
import six from '../images/numbers/number-6.png';
import seven from '../images/numbers/number-7.png';
import eight from '../images/numbers/number-8.png';

export default function Board({level, mines}){
    const [blankArray, setBlankArray] = useState([]);
    const [numberArray, setNumberArray] = useState([]);

    let row;
    let col;
    let boardWidth;
    let numberedBoard = [' ']; //first item just a placeholder
    
    if (level === 'easy') {
        row = 8;
        col = 10;
        boardWidth = '300px';        
    } else if (level === 'medium') {
        row = 14;
        col = 18;
        boardWidth = '540px';
    } else {
        row = 20;
        col = 24;
        boardWidth = '720px';
    }

    function numToCoordinate(num){
        let numRow, numCol;
        
        if (num%col === 0){
            numRow = num/col;
            numCol = col;
        } else {
            numRow = Math.floor(num/col)+1;
            numCol = num%col;
        }
        return [numRow, numCol];
    }

    function coordinateToNum([corRow, corCol]){
        return (corRow-1)*col+corCol;
    }

    //check if the cell is in certain array
    function surroundingCounter(array,[corRow, corCol]){
        if (array.includes(coordinateToNum([corRow, corCol]))){
            return 1;
        } else {
            return 0;
        }
    }

    //consider the position of the cell on the board and count the surrounding mines
    function boardInspector(array, [corRow, corCol], func){
        let count = 0;
        //top-left
        if (corRow-1 === 0 && corCol-1 === 0){
            count += func(array,[corRow,   corCol+1]);
            count += func(array,[corRow+1, corCol]);
            count += func(array,[corRow+1, corCol+1]);
        //top-right
        } else if (corRow-1 === 0 && corCol+1 > col){
            count += func(array,[corRow,   corCol-1]);
            count += func(array,[corRow+1, corCol-1]);
            count += func(array,[corRow+1, corCol]);
        //bottom-left
        } else if (corCol-1 ===0 && corRow+1 > row){
            count += func(array,[corRow-1, corCol]);
            count += func(array,[corRow-1, corCol+1]);
            count += func(array,[corRow,   corCol+1]);
        //bottom-right
        } else if (corCol+1 > col && corRow+1 > row){
            count += func(array,[corRow-1, corCol-1]);
            count += func(array,[corRow-1, corCol]);
            count += func(array,[corRow,   corCol-1]); 
        //top row excluding the corner ones
        } else if (corRow-1 === 0){
            count += func(array,[corRow,   corCol+1]);
            count += func(array,[corRow+1, corCol]);
            count += func(array,[corRow+1, corCol+1]);
            count += func(array,[corRow,   corCol-1]);
            count += func(array,[corRow+1, corCol-1]); 
        //the first col excluding corner ones
        } else if (corCol-1 === 0){
            count += func(array,[corRow,   corCol+1]);
            count += func(array,[corRow+1, corCol]);
            count += func(array,[corRow+1, corCol+1]);
            count += func(array,[corRow-1, corCol]);
            count += func(array,[corRow-1, corCol+1]);
        //last col excluding corners
        } else if (corCol+1 > col){
            count += func(array,[corRow,   corCol-1]);
            count += func(array,[corRow+1, corCol-1]);
            count += func(array,[corRow+1, corCol]);
            count += func(array,[corRow-1, corCol-1]);
            count += func(array,[corRow-1, corCol]);
        //last row excluding corner ones
        } else if (corRow+1 > row){
            count += func(array,[corRow-1, corCol]);
            count += func(array,[corRow-1, corCol+1]);
            count += func(array,[corRow,   corCol+1]);
            count += func(array,[corRow-1, corCol-1]);
            count += func(array,[corRow,   corCol-1]);
        //general ones
        } else {
            count += func(array,[corRow,   corCol+1]);
            count += func(array,[corRow+1, corCol]);
            count += func(array,[corRow+1, corCol+1]);
            count += func(array,[corRow-1, corCol]);
            count += func(array,[corRow-1, corCol+1]);
            count += func(array,[corRow,   corCol-1]);
            count += func(array,[corRow+1, corCol-1]);
            count += func(array,[corRow-1, corCol-1]);
        }
        return count;
    }
    
    for (let i=1; i<=row*col; i++) {
        if (mines.includes(i)) {
            numberedBoard[i] = 'm';
        } else {
            //turn each numbered cell into coordinates
            const [targetRow, targetCol] = numToCoordinate(i);
            let count = boardInspector(mines, [targetRow, targetCol], surroundingCounter);
            if (count === 0){
                numberedBoard[i] = 'b';
            } else {
                numberedBoard[i] = count;
            }
        }
    }

    //Check if the cell is a blank one
    function blankCellFinder(array, [corRow, corCol]){
        if (array[coordinateToNum([corRow, corCol])] === 'b'){
            return true;
        } else {
            return false;
        }
    }

    //Numbered cell style
    function numberedCell (val, func){
        if (val === 1){
            return (
                func({
                    backgroundImage: `url(${one})`,
                    backgroundSize: `100% 100%`
                })
            )
        } else if (val === 2){
            return (
                func({
                    backgroundImage: `url(${two})`,
                    backgroundSize: `100% 100%`
                })
            )
        } else if (val === 3){
            return (
                func({
                    backgroundImage: `url(${three})`,
                    backgroundSize: `100% 100%`
                })
            )
        } else if (val === 4){
            return (
                func({
                    backgroundImage: `url(${four})`,
                    backgroundSize: `100% 100%`
                })
            )
        } else if (val === 5){
            return (
                func({
                    backgroundImage: `url(${five})`,
                    backgroundSize: `100% 100%`
                })
            )
        } else if (val === 6){
            return (
                func({
                    backgroundImage: `url(${six})`,
                    backgroundSize: `100% 100%`
                })
            )
        } else if (val === 7){
            return (
                func({
                    backgroundImage: `url(${seven})`,
                    backgroundSize: `100% 100%`
                })
            )
        } else {
            return (
                func({
                    backgroundImage: `url(${eight})`,
                    backgroundSize: `100% 100%`
                })
            )
        }
    }

    function blankArea (id){
        const blankCells = [...blankArray, id];
        const numberCells = numberArray;
        let j = 0;
        
        function numAndBlankInspector(finderFunc, boardArray, [corRow, corCol], subArrayBlank, transformFunc, subArrayNumber){
            if (finderFunc(boardArray,[corRow, corCol])){
                if (!(subArrayBlank.includes(transformFunc([corRow, corCol])))){
                    subArrayBlank.push(transformFunc([corRow, corCol]));
                }
            } else {
                if (!(subArrayNumber.includes(transformFunc([corRow, corCol])))){
                    subArrayNumber.push(transformFunc([corRow, corCol]));
                }
            }
        }

        while (j < blankCells.length){
            const [blankRow, blankCol] = numToCoordinate(blankCells[j]);
            //top-left
            if (blankRow-1 === 0 && blankCol-1 === 0){
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow, blankCol+1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow+1, blankCol+1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow+1, blankCol], blankCells, coordinateToNum, numberCells);
            //top-right
            } else if (blankRow-1 === 0 && blankCol+1 > col){
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow, blankCol-1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow+1, blankCol-1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow+1, blankCol], blankCells, coordinateToNum, numberCells);
            //bottom-left
            } else if (blankCol-1 ===0 && blankRow+1 > row){
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow-1, blankCol], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow-1, blankCol+1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow, blankCol+1], blankCells, coordinateToNum, numberCells);
            //bottom-right
            } else if (blankCol+1 > col && blankRow+1 > row){
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow-1, blankCol], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow-1, blankCol-1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow, blankCol-1], blankCells, coordinateToNum, numberCells);
            //top row excluding the corner ones
            } else if (blankRow-1 === 0){
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow, blankCol-1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow, blankCol+1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow+1, blankCol-1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow+1, blankCol], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow+1, blankCol+1], blankCells, coordinateToNum, numberCells);
            //the first col excluding corner ones
            } else if (blankCol-1 === 0){
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow-1, blankCol], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow-1, blankCol+1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow, blankCol+1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow+1, blankCol], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow+1, blankCol+1], blankCells, coordinateToNum, numberCells);
            //last col excluding corners
            } else if (blankCol+1 > col){
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow-1, blankCol], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow-1, blankCol-1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow, blankCol-1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow+1, blankCol-1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow+1, blankCol], blankCells, coordinateToNum, numberCells);
            //last row excluding corner ones
            } else if (blankRow+1 > row){
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow, blankCol-1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow, blankCol+1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow-1, blankCol-1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow-1, blankCol], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow-1, blankCol+1], blankCells, coordinateToNum, numberCells);
            //general ones
            } else {
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow-1, blankCol-1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow-1, blankCol], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow-1, blankCol+1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow, blankCol-1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow, blankCol+1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow+1, blankCol-1], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow+1, blankCol], blankCells, coordinateToNum, numberCells);
                numAndBlankInspector(blankCellFinder,numberedBoard, [blankRow+1, blankCol+1], blankCells, coordinateToNum, numberCells);
            }
            j++;
        }
        setBlankArray([...blankArray, ...blankCells]);
        setNumberArray([...numberArray, ...numberCells]);
        console.log(blankArray);
        console.log(numberArray);
        console.log(numberedCell(2, (obj) => obj));
    }

    return (
        <div className='board' style={{width: boardWidth}}>
            {numberedBoard.map((value, index) => {
                if (blankArray.includes(index)){
                    return (
                        <Cell
                            key={index}
                            id={index}
                            value={value}
                            onBlank={blankArea}
                            style={{backgroundColor: `#F3DEBA`}}
                            numberStyle={numberedCell}
                            revealed={true}
                        /> 
                    );
                } else if (numberArray.includes(index)){
                    return (
                        <Cell
                            key={index}
                            id={index}
                            value={value}
                            onBlank={blankArea}
                            style={numberedCell(value, (obj) => obj)}
                            numberStyle={numberedCell}
                            revealed={true}
                        />
                    );
                } else if (index !== 0) {
                    return (
                        <Cell 
                            key={index}
                            id={index}
                            value={value}
                            onBlank={blankArea}
                            numberStyle={numberedCell}
                            revealed={false}
                        />
                    );
                } else {
                    return null;
                }
            })}
        </div>
    )
}