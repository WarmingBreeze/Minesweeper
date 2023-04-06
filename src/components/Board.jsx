import Cell from './Cell.jsx';
import './Board.css';
import { useState } from 'react';

export default function Board({level, mines}){
    const [blankArray, setBlankArray] = useState([]);

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

    //consider the position of the cell on the board and check the surrounding
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

    function blankArea (id){
        const blankCells = [id];
        let j = 0;
        while (j < blankCells.length){
            const [blankRow, blankCol] = numToCoordinate(blankCells[j]);
            //top-left
            if (blankRow-1 === 0 && blankCol-1 === 0){
                if (blankCellFinder(numberedBoard, [blankRow, blankCol+1]) && (!(blankCells.includes(coordinateToNum([blankRow, blankCol+1]))))){
                    blankCells.push(coordinateToNum([blankRow, blankCol+1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow+1, blankCol+1])&& (!(blankCells.includes(coordinateToNum([blankRow+1, blankCol+1]))))){
                    blankCells.push(coordinateToNum([blankRow+1, blankCol+1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow+1, blankCol])&& (!(blankCells.includes(coordinateToNum([blankRow+1, blankCol]))))){
                    blankCells.push(coordinateToNum([blankRow+1, blankCol]));
                }
            //top-right
            } else if (blankRow-1 === 0 && blankCol+1 > col){
                if (blankCellFinder(numberedBoard, [blankRow, blankCol-1])&& (!(blankCells.includes(coordinateToNum([blankRow, blankCol-1]))))){
                    blankCells.push(coordinateToNum([blankRow, blankCol-1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow+1, blankCol-1])&& (!(blankCells.includes(coordinateToNum([blankRow+1, blankCol-1]))))){
                    blankCells.push(coordinateToNum([blankRow+1, blankCol-1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow+1, blankCol])&& (!(blankCells.includes(coordinateToNum([blankRow+1, blankCol]))))){
                    blankCells.push(coordinateToNum([blankRow+1, blankCol]));
                }
            //bottom-left
            } else if (blankCol-1 ===0 && blankRow+1 > row){
                if (blankCellFinder(numberedBoard, [blankRow-1, blankCol])&& (!(blankCells.includes(coordinateToNum([blankRow-1, blankCol]))))){
                    blankCells.push(coordinateToNum([blankRow-1, blankCol]));
                }
                if (blankCellFinder(numberedBoard, [blankRow-1, blankCol+1])&& (!(blankCells.includes(coordinateToNum([blankRow-1, blankCol+1]))))){
                    blankCells.push(coordinateToNum([blankRow-1, blankCol+1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow, blankCol+1])&& (!(blankCells.includes(coordinateToNum([blankRow, blankCol+1]))))){
                    blankCells.push(coordinateToNum([blankRow, blankCol+1]));
                }
            //bottom-right
            } else if (blankCol+1 > col && blankRow+1 > row){
                if (blankCellFinder(numberedBoard, [blankRow-1, blankCol])&& (!(blankCells.includes(coordinateToNum([blankRow-1, blankCol]))))){
                    blankCells.push(coordinateToNum([blankRow-1, blankCol]));
                }
                if (blankCellFinder(numberedBoard, [blankRow-1, blankCol-1])&& (!(blankCells.includes(coordinateToNum([blankRow-1, blankCol-1]))))){
                    blankCells.push(coordinateToNum([blankRow-1, blankCol-1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow, blankCol-1])&& (!(blankCells.includes(coordinateToNum([blankRow, blankCol-1]))))){
                    blankCells.push(coordinateToNum([blankRow, blankCol-1]));
                }
            //top row excluding the corner ones
            } else if (blankRow-1 === 0){
                if (blankCellFinder(numberedBoard, [blankRow, blankCol-1])&& (!(blankCells.includes(coordinateToNum([blankRow, blankCol-1]))))){
                    blankCells.push(coordinateToNum([blankRow, blankCol-1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow, blankCol+1])&& (!(blankCells.includes(coordinateToNum([blankRow, blankCol+1]))))){
                    blankCells.push(coordinateToNum([blankRow, blankCol+1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow+1, blankCol-1])&& (!(blankCells.includes(coordinateToNum([blankRow+1, blankCol-1]))))){
                    blankCells.push(coordinateToNum([blankRow+1, blankCol-1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow+1, blankCol])&& (!(blankCells.includes(coordinateToNum([blankRow+1, blankCol]))))){
                    blankCells.push(coordinateToNum([blankRow+1, blankCol]));
                }
                if (blankCellFinder(numberedBoard, [blankRow+1, blankCol+1])&& (!(blankCells.includes(coordinateToNum([blankRow+1, blankCol+1]))))){
                    blankCells.push(coordinateToNum([blankRow+1, blankCol+1]));
                }
            //the first col excluding corner ones
            } else if (blankCol-1 === 0){
                if (blankCellFinder(numberedBoard, [blankRow-1, blankCol])&& (!(blankCells.includes(coordinateToNum([blankRow-1, blankCol]))))){
                    blankCells.push(coordinateToNum([blankRow-1, blankCol]));
                }
                if (blankCellFinder(numberedBoard, [blankRow-1, blankCol+1])&& (!(blankCells.includes(coordinateToNum([blankRow-1, blankCol+1]))))){
                    blankCells.push(coordinateToNum([blankRow-1, blankCol+1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow, blankCol+1])&& (!(blankCells.includes(coordinateToNum([blankRow, blankCol+1]))))){
                    blankCells.push(coordinateToNum([blankRow, blankCol+1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow+1, blankCol])&& (!(blankCells.includes(coordinateToNum([blankRow+1, blankCol]))))){
                    blankCells.push(coordinateToNum([blankRow+1, blankCol]));
                }
                if (blankCellFinder(numberedBoard, [blankRow+1, blankCol+1])&& (!(blankCells.includes(coordinateToNum([blankRow+1, blankCol+1]))))){
                    blankCells.push(coordinateToNum([blankRow+1, blankCol+1]));
                }
            //last col excluding corners
            } else if (blankCol+1 > col){
                if (blankCellFinder(numberedBoard, [blankRow-1, blankCol])&& (!(blankCells.includes(coordinateToNum([blankRow-1, blankCol]))))){
                    blankCells.push(coordinateToNum([blankRow-1, blankCol]));
                }
                if (blankCellFinder(numberedBoard, [blankRow-1, blankCol-1])&& (!(blankCells.includes(coordinateToNum([blankRow-1, blankCol-1]))))){
                    blankCells.push(coordinateToNum([blankRow-1, blankCol-1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow, blankCol-1])&& (!(blankCells.includes(coordinateToNum([blankRow, blankCol-1]))))){
                    blankCells.push(coordinateToNum([blankRow, blankCol-1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow+1, blankCol-1])&& (!(blankCells.includes(coordinateToNum([blankRow+1, blankCol-1]))))){
                    blankCells.push(coordinateToNum([blankRow+1, blankCol-1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow+1, blankCol])&& (!(blankCells.includes(coordinateToNum([blankRow+1, blankCol]))))){
                    blankCells.push(coordinateToNum([blankRow+1, blankCol]));
                }
            //last row excluding corner ones
            } else if (blankRow+1 > row){
                if (blankCellFinder(numberedBoard, [blankRow, blankCol-1])&& (!(blankCells.includes(coordinateToNum([blankRow, blankCol-1]))))){
                    blankCells.push(coordinateToNum([blankRow, blankCol-1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow, blankCol+1])&& (!(blankCells.includes(coordinateToNum([blankRow, blankCol+1]))))){
                    blankCells.push(coordinateToNum([blankRow, blankCol+1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow-1, blankCol-1])&& (!(blankCells.includes(coordinateToNum([blankRow-1, blankCol-1]))))){
                    blankCells.push(coordinateToNum([blankRow-1, blankCol-1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow-1, blankCol])&& (!(blankCells.includes(coordinateToNum([blankRow-1, blankCol]))))){
                    blankCells.push(coordinateToNum([blankRow-1, blankCol]));
                }
                if (blankCellFinder(numberedBoard, [blankRow-1, blankCol+1])&& (!(blankCells.includes(coordinateToNum([blankRow-1, blankCol+1]))))){
                    blankCells.push(coordinateToNum([blankRow-1, blankCol+1]));
                }
            //general ones
            } else {
                if (blankCellFinder(numberedBoard, [blankRow-1, blankCol-1])&& (!(blankCells.includes(coordinateToNum([blankRow-1, blankCol-1]))))){
                    blankCells.push(coordinateToNum([blankRow-1, blankCol-1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow-1, blankCol])&& (!(blankCells.includes(coordinateToNum([blankRow-1, blankCol]))))){
                    blankCells.push(coordinateToNum([blankRow-1, blankCol]));
                }
                if (blankCellFinder(numberedBoard, [blankRow-1, blankCol+1])&& (!(blankCells.includes(coordinateToNum([blankRow-1, blankCol+1]))))){
                    blankCells.push(coordinateToNum([blankRow-1, blankCol+1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow, blankCol-1])&& (!(blankCells.includes(coordinateToNum([blankRow, blankCol-1]))))){
                    blankCells.push(coordinateToNum([blankRow, blankCol-1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow, blankCol+1])&& (!(blankCells.includes(coordinateToNum([blankRow, blankCol+1]))))){
                    blankCells.push(coordinateToNum([blankRow, blankCol+1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow+1, blankCol-1])&& (!(blankCells.includes(coordinateToNum([blankRow+1, blankCol-1]))))){
                    blankCells.push(coordinateToNum([blankRow+1, blankCol-1]));
                }
                if (blankCellFinder(numberedBoard, [blankRow+1, blankCol])&& (!(blankCells.includes(coordinateToNum([blankRow+1, blankCol]))))){
                    blankCells.push(coordinateToNum([blankRow+1, blankCol]));
                }
                if (blankCellFinder(numberedBoard, [blankRow+1, blankCol+1])&& (!(blankCells.includes(coordinateToNum([blankRow+1, blankCol+1]))))){
                    blankCells.push(coordinateToNum([blankRow+1, blankCol+1]));
                }
            }
            console.log(blankCells);
            j++;
        }
        setBlankArray([...blankArray, ...blankCells]);
        console.log(blankArray);   
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
                            style={{opacity: 0.8, outline: `inset`}}
                        /> 
                    );
                }
                else if (index !== 0) {
                    return (
                        <Cell key={index} id={index} value={value} onBlank={blankArea}/>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    )
}