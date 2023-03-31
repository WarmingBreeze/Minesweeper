import Cell from './Cell.jsx';
import './Board.css';

export default function Board({level}){
    const vWidth = window.innerWidth;
    const vHeight = window.innerHeight;
    let numOfCells;
    let row;
    let col;
    let tagsHor = [];
    let tagsVer = [];
    
    
    if (level === 'easy') {
        numOfCells = 80;
        
    } else if (level === 'medium') {
        numOfCells = 252;
    } else {
        numOfCells = 480;
    }
    for (var i=0; i<col; i++) {
        tagsHor.push(<Cell key={i}/>);
    }
    for (var j=0; j<row; j++) {
        tagsVer.push(<div className='board-row'>{tagsHor}</div>);
    }

    return (
        <div className='board'>
            {tagsVer}
        </div>
    )
}