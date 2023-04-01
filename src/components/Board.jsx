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
        if (num%col == 0){
            const numRow = num/col;
            const numCol = col;
        } else {
            const numRow = Math.floor(num/col)+1;
            const numCol = num%col;
        }
        return [numRow, numCol];
    }

    function coordinateToNum([corRow, corCol]){
        return (corRow-1)*col+corCol;
    }

    for (i=1; i<=row*col; i++) {
        if (mines.includes(i)) {
            numberedBoard[i] = 'm';
        } else {
            const [targetRow, targetCol] = numToCoordinate(i);
            if (targetRow-1 > 0 )
        }
    }
    return (
        <div className='board'>
            <Cell/>
        </div>
    )
}