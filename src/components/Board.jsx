import Cell from './Cell.jsx';
import './Board.css';

export default function Board({level, mines}){
    let row;
    let col;
    let numberedBoard = [' '];
    
    if (level === 'easy') {
        row = 8;
        col = 10;        
    } else if (level === 'medium') {
        row = 14;
        col = 18;
    } else {
        row = 20;
        col = 24;
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
    
    for (let i=1; i<=row*col; i++) {
        if (mines.includes(i)) {
            numberedBoard[i] = 'm';
        } else {
            //turn each numbered cell into coordinates
            const [targetRow, targetCol] = numToCoordinate(i);
            let count = 0;
            //the top left cell
            if (targetRow-1 === 0 && targetCol-1 === 0){
                if (mines.includes(coordinateToNum([targetRow, targetCol+1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow+1, targetCol]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow+1, targetCol+1]))){
                    count++;
                }
            //the top right cell
            } else if (targetRow-1 === 0 && targetCol+1 > col){
                if (mines.includes(coordinateToNum([targetRow, targetCol-1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow+1, targetCol-1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow+1, targetCol]))){
                    count++;
                }
            //bottom-left
            } else if (targetCol-1 ===0 && targetRow+1 > row){
                if (mines.includes(coordinateToNum([targetRow-1, targetCol]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow-1, targetCol+1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow, targetCol+1]))){
                    count++;
                }
            //bottom-right
            } else if (targetCol+1 > col && targetRow+1 > row){ 
                if (mines.includes(coordinateToNum([targetRow-1, targetCol-1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow-1, targetCol]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow, targetCol-1]))){
                    count++;
                }
            //top row excluding the corner ones
            } else if (targetRow-1 === 0){ 
                if (mines.includes(coordinateToNum([targetRow, targetCol+1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow+1, targetCol]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow+1, targetCol+1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow, targetCol-1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow+1, targetCol-1]))){
                    count++;
                }
            //the first col excluding corner ones
            } else if (targetCol-1 === 0){
                if (mines.includes(coordinateToNum([targetRow, targetCol+1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow+1, targetCol]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow+1, targetCol+1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow-1, targetCol]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow-1, targetCol+1]))){
                    count++;
                }
            //last col excluding corners
            } else if (targetCol+1 > col){
                if (mines.includes(coordinateToNum([targetRow, targetCol-1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow+1, targetCol-1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow+1, targetCol]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow-1, targetCol-1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow-1, targetCol]))){
                    count++;
                }
            //last row excluding corner ones
            } else if (targetRow+1 > row){
                if (mines.includes(coordinateToNum([targetRow-1, targetCol]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow-1, targetCol+1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow, targetCol+1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow-1, targetCol-1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow, targetCol-1]))){
                    count++;
                }
            } else {
                if (mines.includes(coordinateToNum([targetRow, targetCol+1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow+1, targetCol]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow+1, targetCol+1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow-1, targetCol]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow-1, targetCol+1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow, targetCol-1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow+1, targetCol-1]))){
                    count++;
                }
                if (mines.includes(coordinateToNum([targetRow-1, targetCol-1]))){
                    count++;
                }
            }

            if (count === 0){
                numberedBoard[i] = 'b';
            } else {
                numberedBoard[i] = count;
            }
        }
    }

    console.log(numberedBoard);

    return (
        <div className='board'>
            <Cell/>
        </div>
    )
}