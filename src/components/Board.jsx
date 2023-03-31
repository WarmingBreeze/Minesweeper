import Cell from './Cell.jsx';
import './Board.css';

export default function Board({level}){
    let row;
    let col;
    let tagsHor = [];
    let tagsVer = [];
    
    
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
    for (var i=0; i<col; i++) {
        tagsHor.push(<Cell key={i}/>);
    }
    for (var j=0; j<row; j++) {
        tagsVer.push(<div className='board-row'>{tagsHor}</div>);
    }

    return (
        <div className='board'>
            <Cell/>
        </div>
    )
}