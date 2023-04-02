import Cell from './Cell.jsx';
import './Board.css';

export default function Board({level, mines}){
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

    function surroundBombCounter([corRow, corCol]){
        if (mines.includes(coordinateToNum([corRow, corCol]))){
            return 1;
        } else {
            return 0;
        }
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
                count += surroundBombCounter([targetRow, targetCol+1]);
                count += surroundBombCounter([targetRow+1, targetCol]);
                count += surroundBombCounter([targetRow+1, targetCol+1]);
            //the top right cell
            } else if (targetRow-1 === 0 && targetCol+1 > col){
                count += surroundBombCounter([targetRow, targetCol-1]);
                count += surroundBombCounter([targetRow+1, targetCol-1]);
                count += surroundBombCounter([targetRow+1, targetCol]);
            //bottom-left
            } else if (targetCol-1 ===0 && targetRow+1 > row){
                count += surroundBombCounter([targetRow-1, targetCol]);
                count += surroundBombCounter([targetRow-1, targetCol+1]);
                count += surroundBombCounter([targetRow, targetCol+1]);
            //bottom-right
            } else if (targetCol+1 > col && targetRow+1 > row){
                count += surroundBombCounter([targetRow-1, targetCol-1]);
                count += surroundBombCounter([targetRow-1, targetCol]);
                count += surroundBombCounter([targetRow, targetCol-1]); 
            //top row excluding the corner ones
            } else if (targetRow-1 === 0){
                count += surroundBombCounter([targetRow, targetCol+1]);
                count += surroundBombCounter([targetRow+1, targetCol]);
                count += surroundBombCounter([targetRow+1, targetCol+1]);
                count += surroundBombCounter([targetRow, targetCol-1]);
                count += surroundBombCounter([targetRow+1, targetCol-1]); 
            //the first col excluding corner ones
            } else if (targetCol-1 === 0){
                count += surroundBombCounter([targetRow, targetCol+1]);
                count += surroundBombCounter([targetRow+1, targetCol]);
                count += surroundBombCounter([targetRow+1, targetCol+1]);
                count += surroundBombCounter([targetRow-1, targetCol]);
                count += surroundBombCounter([targetRow-1, targetCol+1]);
            //last col excluding corners
            } else if (targetCol+1 > col){
                count += surroundBombCounter([targetRow, targetCol-1]);
                count += surroundBombCounter([targetRow+1, targetCol-1]);
                count += surroundBombCounter([targetRow+1, targetCol]);
                count += surroundBombCounter([targetRow-1, targetCol-1]);
                count += surroundBombCounter([targetRow-1, targetCol]);
            //last row excluding corner ones
            } else if (targetRow+1 > row){
                count += surroundBombCounter([targetRow-1, targetCol]);
                count += surroundBombCounter([targetRow-1, targetCol+1]);
                count += surroundBombCounter([targetRow, targetCol+1]);
                count += surroundBombCounter([targetRow-1, targetCol-1]);
                count += surroundBombCounter([targetRow, targetCol-1]);
            } else {
                count += surroundBombCounter([targetRow, targetCol+1]);
                count += surroundBombCounter([targetRow+1, targetCol]);
                count += surroundBombCounter([targetRow+1, targetCol+1]);
                count += surroundBombCounter([targetRow-1, targetCol]);
                count += surroundBombCounter([targetRow-1, targetCol+1]);
                count += surroundBombCounter([targetRow, targetCol-1]);
                count += surroundBombCounter([targetRow+1, targetCol-1]);
                count += surroundBombCounter([targetRow-1, targetCol-1]);
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
        <div className='board' style={{width: boardWidth}}>
            {numberedBoard.map((value, index) => {
                if (index !== 0) {
                    return (
                    <Cell key={index} id={index} value={value}/>
                    );
                }
            })}
        </div>
    )
}